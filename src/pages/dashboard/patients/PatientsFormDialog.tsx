import { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from 'components/hook-form';
import {  IPatient, useUpdatePatient } from './patients.hooks';
import _ from 'lodash';

type PatientsFormDialogProps = {
  open: boolean;
  onClose: () => void;
  editItem?: IPatient;
};

function PatientsFormDialog({ open, onClose, editItem }: PatientsFormDialogProps) {
  const { mutateAsync: updateItemAsync } = useUpdatePatient()
  const isEdit = !!editItem;
  const PatientSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
  };

  const methods = useForm({
    resolver: yupResolver(PatientSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(editItem || defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editItem]);

  const onSubmit = async (values) => {
    try {
      if (isEdit) {
        // @ts-ignore
        await updateItemAsync(values);
      } 
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Edit patient' : 'Add new patient'}</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <RHFTextField name="username" label="Username" disabled={isEdit} />
            <Stack direction={'row'} spacing={2}>
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
            </Stack>
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

export default PatientsFormDialog;