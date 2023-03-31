import { useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import { useUsersList, sendUserResetPasswordEmail, IUser } from './users.hooks';
import UsersFormDialog from './UsersFormDialog';

export default function UsersListPage() {
  const { themeStretch } = useSettings();
  const { data = [], isLoading } = useUsersList();
  const [pageSize, setPageSize] = useState(25);
  const [editItem, setEditItem] = useState<IUser | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const onCloseForm = () => {
    setEditItem(null);
    setIsFormModalOpen(false);
  };
  const handleAddClick = () => {
    setEditItem(null);
    setIsFormModalOpen(true);
  };
  const handleEditClick = (row) => {
    setEditItem(row);
    setIsFormModalOpen(true);
  };

  const handleSendForgetEmailClick = (row) => {
    sendUserResetPasswordEmail(row.email);
  };

  const columns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1, valueGetter: ({ row }) => [row.firstName, row.lastName].join(' ') },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'branch', headerName: 'Branch', flex: 1 },
    { field: 'workRole', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          showInMenu
          key={`edit-${id}`}
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditClick(row)}
          color="inherit"
        />,
        <GridActionsCellItem
          showInMenu
          key={`reset-password-${id}`}
          icon={<EmailIcon />}
          label="Send reset password email"
          onClick={() => handleSendForgetEmailClick(row)}
          color="inherit"
        />,
      ],
    },
  ];

  return (
    <Page title="Users List">
      <Container
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        maxWidth={themeStretch ? false : 'xl'}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h3" component="h1" paragraph>
            Users
          </Typography>
          <Button variant="outlined" onClick={handleAddClick}>
            Add New User
          </Button>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <DataGrid
            getRowId={(row) => row.userId}
            loading={isLoading}
            disableSelectionOnClick
            rows={data}
            editMode="row"
            columns={columns}
            density={'compact'}
            pagination
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Box>
        <UsersFormDialog open={isFormModalOpen} editItem={editItem} onClose={onCloseForm} />
      </Container>
    </Page>
  );
}
