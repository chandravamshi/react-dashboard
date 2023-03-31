import { useState } from 'react';
import { Badge, Box, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import { usePatientsList, sendPatientResetPasswordEmail, IPatient } from './patients.hooks';
import PatientsFormDialog from './PatientsFormDialog';
import { useNavigate } from 'react-router';
import { useSearchByKeys } from 'hooks/useSearch';
import { useDebounce } from 'use-debounce';
import QuickSearchToolbar from 'components/QuickSearchToolbar';

export default function PatientsListPage() {
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const { data = [], isLoading } = usePatientsList();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 400);
  const filteredData = useSearchByKeys(debouncedSearchText, data, ['fullName', 'email']);
  const [pageSize, setPageSize] = useState(25);
  const [editItem, setEditItem] = useState<IPatient | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const onCloseForm = () => {
    setEditItem(null);
    setIsFormModalOpen(false);
  };
  const handleEditClick = (row) => {
    setEditItem(row);
    setIsFormModalOpen(true);
  };
  const handleViewClick = (row) => {
    navigate(`/dashboard/patients/${row.patientId}`);
  };
  const handleSendForgetEmailClick = (row) => {
    sendPatientResetPasswordEmail(row.email);
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, valueGetter: ({ row }) => [row.firstName, row.lastName].join(' ') },
    {
      field: 'createdDate',
      headerName: 'Last activity',
      width: 120,
      renderCell: ({ row }) => {
        // @ts-ignore
        const diffTime = Math.abs(new Date(row.createdDate) - new Date());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
        let color = 'warning';
        let text = `${diffDays} days`;
        if (diffDays === 0) {
          color = 'success';
          text = 'Today';
        } else if (diffDays < 7) {
          color = 'success';
        } else if (diffDays > 30) {
          color = 'grey';
          text = `+30 days`;
        }
        return (
          <>
            <Badge color={color as any} variant="dot" />
            <Box sx={{ mr: 2 }} />
            {text}
          </>
        );
      },
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'methode', headerName: 'OP method', flex: 1 },
    { field: 'operationDate', headerName: 'OP date', flex: 1, type: 'date' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          key={`view-${id}`}
          icon={<VisibilityIcon />}
          label="View"
          className="textPrimary"
          onClick={() => handleViewClick(row)}
          color="inherit"
        />,
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
    <Page title="Patients List">
      <Container
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        maxWidth={themeStretch ? false : 'xl'}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h3" component="h1" paragraph>
            Patients
          </Typography>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => setSearchText(event.target.value),
                onClear: () => setSearchText(''),
              },
            }}
            getRowId={(row) => row.patientId}
            loading={isLoading}
            disableSelectionOnClick
            rows={filteredData}
            editMode="row"
            columns={columns}
            density={'compact'}
            pagination
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Box>
        <PatientsFormDialog open={isFormModalOpen} editItem={editItem} onClose={onCloseForm} />
      </Container>
    </Page>
  );
}
