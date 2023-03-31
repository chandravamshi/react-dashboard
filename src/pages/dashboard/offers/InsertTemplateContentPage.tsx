import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';

import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import TemplateFormDialog from './CreateTemplateDialogue';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTemplate, useTemplateList } from './offers.hooks';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';


export default function InsertTemplateContentPage() {
    const { themeStretch } = useSettings();

    const [templateId, setTemplateId] = useState();
    const [contentId, setContentId] = useState();
    const [contentData, setContentData] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const [editItem, setEditItem] = useState<any | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const [isConfirmUnsubmitedOpen, setIsConfirmUnsubmitedOpen] = useState(false);


    const { mutateAsync: deleteTemplate, isLoading: isDeleteRunning } = useDeleteTemplate();


    const { data = [], isLoading } = useTemplateList();



    const handleTempalteChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setTemplateId(e.target.value);
        }
    };

    const handleContentChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setContentId(e.target.value);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (templateId && contentId && contentData) {
            setIsSubmit(true);
        }
    };

    const onCloseForm = () => {
        setEditItem(null);
        setIsFormModalOpen(false);
    };


    const createItem = async (item): Promise<any> => {
        return axios.post("http://localhost:5001/offers/create-template", item);

    };

    useEffect(() => {
        if (isSubmit) {
            axios.post("http://localhost:5001/offers/insert-template-data", { templateId, contentId, contentData }).then((res) => {
                console.log(res);
            });
        }
    }, [isSubmit]);

    const handleAddClick = () => {
        setEditItem(null);
        setIsFormModalOpen(true);
    };

    const onDeleteClick = (row) => {
        deleteTemplate(row)
    };
    const handleEditClick = (row) => {
        setEditItem(row);
        setIsFormModalOpen(true);
    };
    const columns = [

        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: true,
            sortable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => {
                const actions = [];
                actions.push(
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleEditClick(row)}
                        color="inherit"
                    />
                );

                actions.push(
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => onDeleteClick(row)}
                        color="inherit"
                    />
                );
                return actions;
            },
        },
    ];



    const rows = [...data];
    return (
        <Page title="Insert Template Content">
            <Container
                sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                maxWidth={themeStretch ? false : 'xl'}
            >
                <Typography variant="h3" component="h1" paragraph>
                    Insert Template Content
                </Typography>
                <Stack direction={'row'} spacing={2}>
                    <Button variant="outlined" onClick={handleAddClick}>
                        Create New Template
                    </Button>

                </Stack>

                {/* <form>
                    <FormControl>
                        <FormLabel>Template Id</FormLabel>
                        <TextField
                            type="number"
                            id="template-id"
                            variant="outlined"
                            onChange={(e) => handleTempalteChange(e)}
                            value={templateId}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Content Id</FormLabel>
                        <TextField
                            type="number"
                            id="content-id"
                            variant="outlined"
                            onChange={(e) => handleContentChange(e)}
                            value={contentId}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Content Data</FormLabel>
                        <TextField
                            type="text"
                            id="content-data"
                            variant="outlined"
                            onChange={(e) => setContentData(e.target.value)}
                            value={contentData}
                        />
                    </FormControl>
                    <Button variant="outlined" onClick={submitHandler}>Submit</Button>
                </form> */}
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        hideFooterSelectedRowCount
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                pageSize: 5,
                            },
                        }}
                    />
                </Box>

                <TemplateFormDialog
                    open={isFormModalOpen}
                    onClose={onCloseForm}
                    createItem={createItem}
                    editItem={editItem}
                />
            </Container>
        </Page>
    );
}