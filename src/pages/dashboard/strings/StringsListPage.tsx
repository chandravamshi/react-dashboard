import { useMemo, useRef, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import { useDebounce } from 'use-debounce';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';
import StringsFormDialog from './StringsFormDialog';
import { useFullSearch } from 'hooks/useSearch';
import QuickSearchToolbar from 'components/QuickSearchToolbar';
import { IString, useDeleteString, useStringsList, UnsubmitedChanges, useSubmitStringsChanges } from './strings.hooks';
import './StringsListPage.style.css';
import { toast } from 'react-toastify';
import ConfirmUnsubmitedChangesDialog from './components/ConfirmUnsubmitedChangesDialog';

export default function StringsListPage() {
  const { themeStretch } = useSettings();
  const { data = [], isLoading } = useStringsList();
  const { mutateAsync: submitChanges, isLoading: isSubmitingChanges } = useSubmitStringsChanges();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 400);
  const filteredData = useFullSearch(debouncedSearchText, data);
  const [pageSize, setPageSize] = useState(25);
  const [editItem, setEditItem] = useState<IString | null>(null);
  const [isConfirmUnsubmitedOpen, setIsConfirmUnsubmitedOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const editRowsModel = useRef({});
  const [unsubmitedChanges, setUnsubmitedChanges] = useState<UnsubmitedChanges>({});
  const rows = useMemo(() => {
    const createdRows = Object.values(unsubmitedChanges)
      .filter((e) => e?.type === 'create')
      .map(({ item }) => item);
    const updatedData = filteredData.map((item) => {
      if (unsubmitedChanges[item.id]) {
        return unsubmitedChanges[item.id].item;
      }
      return item;
    });

    return [...createdRows, ...updatedData];
  }, [filteredData, unsubmitedChanges]);

  const hasUnsubmitedChanges = useMemo(
    () => Object.values(unsubmitedChanges).filter(Boolean).length > 0,
    [unsubmitedChanges]
  );

  const setEditRowsModel = (row) => {
    editRowsModel.current = row;
  };
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

  const addToUnsubmitedChanges = (type: 'create' | 'delete' | 'update', id: number, item: any) => {
    /* If the item is created and we are updating it, we want to keep the type as created. */
    if (unsubmitedChanges[id]?.type === 'create' && type === 'update') {
      setUnsubmitedChanges((prev) => ({ ...prev, [id]: { type: 'create', item } }));
    } else {
      setUnsubmitedChanges((prev) => ({ ...prev, [id]: { type, item } }));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'de', headerName: 'German', flex: 1, editable: true },
    { field: 'en', headerName: 'English', flex: 1, editable: true },
    { field: 'tr', headerName: 'Turkish', flex: 1, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        const isUnsubmited = !!unsubmitedChanges[id];
        const isCreate = unsubmitedChanges[id]?.type === 'create';
        const isDelete = unsubmitedChanges[id]?.type === 'delete';
        const actions = [];
        const onDeleteClick = () => {
          if (isCreate) {
            setUnsubmitedChanges((prev) => ({ ...prev, [id]: undefined }));
          } else {
            addToUnsubmitedChanges('delete', id, row);
          }
        };
        if (isUnsubmited && !isCreate) {
          actions.push(
            <GridActionsCellItem
              key={`undo-${id}`}
              icon={<UndoIcon />}
              label="Undo"
              className="textPrimary"
              onClick={() => {
                setUnsubmitedChanges((prev) => ({ ...prev, [id]: undefined }));
              }}
              color="inherit"
            />
          );
        }
        if (!isDelete) {
          actions.push(
            <GridActionsCellItem
              key={`edit-${id}`}
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => handleEditClick(row)}
              color="inherit"
            />
          );
        }
        if (!isDelete) {
          actions.push(
            <GridActionsCellItem
              key={`delete-${id}`}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={onDeleteClick}
              color="inherit"
            />
          );
        }

        return actions;
      },
    },
  ];

  const createItem = (item) => {
    if (data.find((i) => i.id === item.id)) return toast.error('Item already exists');
    addToUnsubmitedChanges('create', item.id, item);
  };
  const updateItem = (item) => {
    addToUnsubmitedChanges('update', item.id, item);
  };
  const onRowEditCommit = async (id) => {
    const { en, de, tr } = editRowsModel.current[id]; // The data that will be committed
    updateItem({ id, en: en.value, de: de.value, tr: tr.value });
    // const values = Object.keys(newValues).map((key) => ({ lang: key, text: newValues[key].value }));
    // updateItemAsync({ id, values });
  };

  const handleUnsubmitedChanges = async () => {
    if (isSubmitingChanges) return;
    const response = await submitChanges(unsubmitedChanges);
    response?.data?.forEach(({ status, message, action }) => {
      if (status === 200) {
        setUnsubmitedChanges((prev) => ({ ...prev, [action.item.id]: undefined }));
      } else {
        toast.error(`(${action.item.id}): ${message}`);
      }
    });

    setIsConfirmUnsubmitedOpen(false);
  };

  return (
    <Page title="Strings List">
      <Container
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        maxWidth={themeStretch ? false : 'xl'}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h3" component="h1" paragraph>
            Strings
          </Typography>
          <Stack direction={'row'} spacing={2}>
            <Button variant="outlined" onClick={handleAddClick}>
              Add New String
            </Button>
            {hasUnsubmitedChanges && (
              <Button variant="contained" onClick={() => setIsConfirmUnsubmitedOpen(true)}>
                Submit Changes
              </Button>
            )}
          </Stack>
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
            loading={isLoading}
            disableSelectionOnClick
            onRowEditCommit={onRowEditCommit}
            onEditRowsModelChange={setEditRowsModel}
            rows={rows}
            editMode="row"
            columns={columns}
            density={'compact'}
            pagination
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            rowsPerPageOptions={[25, 50, 100]}
            getRowClassName={(params) => `strings-row-${unsubmitedChanges[params.row.id]?.type}`}
          />
        </Box>
        <ConfirmUnsubmitedChangesDialog
          unsubmitedChanges={unsubmitedChanges}
          open={isConfirmUnsubmitedOpen}
          loading={isSubmitingChanges}
          onClose={() => setIsConfirmUnsubmitedOpen(false)}
          onConfirm={handleUnsubmitedChanges}
        />
        <StringsFormDialog
          open={isFormModalOpen}
          editItem={editItem}
          createItem={createItem}
          updateItem={updateItem}
          onClose={onCloseForm}
        />
      </Container>
    </Page>
  );
}
