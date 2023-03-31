import { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from 'components/hook-form';
import { IString, useCreateString, useUpdateString } from './strings.hooks';
import _ from 'lodash';

type StringsFormDialogProps = {
  open: boolean;
  onClose: () => void;
  editItem?: IString;
  createItem: (item: IString) => void;
  updateItem: (item: IString) => void;
};

function StringsFormDialog({ open, onClose, editItem, updateItem, createItem }: StringsFormDialogProps) {
  const { mutateAsync: createItemAsync } = useCreateString();
  const { mutateAsync: updateItemAsync } = useUpdateString();
  const isEdit = !!editItem;
  const StringSchema = Yup.object().shape({
    id: Yup.string().required('ID is required'),
    de: Yup.string(),
    en: Yup.string(),
    tr: Yup.string()
  });

  const defaultValues = {
    id: '',
    de: '',
    en: '',
    tr: ''
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editItem]);

  const onSubmit = async (values) => {
    try {
      // const body = {
      //   id: values.id,
      //   values: [
      //     { lang: 'de', text: values.de as string },
      //     { lang: 'en', text: values.en as string },
      //   ],
      // };
      if (isEdit) {
        // await updateItemAsync(body);
        updateItem(values);
      } else {
        // await createItemAsync(body);
        createItem(values);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Edit string' : 'Add new string'}</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <RHFTextField name="id" label="ID" disabled={isEdit} />
            <RHFTextField name="de" label="German" />
            <RHFTextField name="en" label="English" />
            <RHFTextField name="tr" label="Turkish" />
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

export default StringsFormDialog;
