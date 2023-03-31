import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions, Box, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from 'components/hook-form';
import _ from 'lodash';
import FormControl from '@mui/material/FormControl';
import React, { useEffect } from 'react';

type TemplatFormDialogProps = {
    open: boolean;
    onClose: () => void;
    editItem?: any;
    createItem?: (item) => void;
    updateItem?: (item) => void;
};



export default function TemplateFormDialog({ open, onClose, editItem, createItem, updateItem }: TemplatFormDialogProps) {

    const isEdit = !!editItem;

    const defaultValues = {
        name: '',
        category: ''
    };
    const StringSchema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        category: Yup.string().required('category is required')
    });

    const methods = useForm({
        resolver: yupResolver(StringSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;


    useEffect(() => {
        reset(editItem || defaultValues);

        setSection('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, editItem]);


    const onSubmit = async (values) => {
        try {
            createItem(values);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const [section, setSection] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSection(event.target.value as string);
    };



    return (

        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
            <DialogTitle>{isEdit ? 'Edit template' : 'Add new template'}</DialogTitle>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Stack spacing={2}>
                        <RHFTextField name="name" label="Name" />
                        <RHFTextField name="category" label="Category" />
                        {isEdit && (<Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={section}
                                    label="Section"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'language'}>Language</MenuItem>
                                    <MenuItem value={'title'}>Title</MenuItem>
                                    <MenuItem value={'grafts'}>Grafts</MenuItem>
                                    <MenuItem value={'contact'}>Contact</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>)}

                        {isEdit && section && (<TextField id="outlined-basic" label={section} variant="outlined" />)}
                    </Stack>


                </DialogContent>

                <Divider />

                <DialogActions>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}
                    >{isEdit ? 'Update' : 'Create'}
                    </LoadingButton>
                    <Button color="inherit" variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );

}