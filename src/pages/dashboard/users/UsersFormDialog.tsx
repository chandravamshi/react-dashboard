import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Dialog,
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from 'components/hook-form';
import { IUser, useCreateUser, useUpdateUser } from './users.hooks';
import Iconify from 'components/Iconify';
import _ from 'lodash';

type UsersFormDialogProps = {
  open: boolean;
  onClose: () => void;
  editItem?: IUser;
};

function UsersFormDialog({ open, onClose, editItem }: UsersFormDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: createItemAsync } = useCreateUser();
  const { mutateAsync: updateItemAsync } = useUpdateUser();
  const isEdit = !!editItem;

  const CreateUserSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    firstName: Yup.string().required().required('First name is required'),
    lastName: Yup.string().required().required('Last name is required'),
    zuganscode: Yup.string(),
  });
  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required().required('First name is required'),
    lastName: Yup.string().required().required('Last name is required'),
    zuganscode: Yup.string(),
  });

  const defaultValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    zuganscode: '',
  };

  const methods = useForm({
    resolver: yupResolver(isEdit ? UpdateUserSchema : CreateUserSchema),
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
        await updateItemAsync(values);
      } else {
        await createItemAsync(values);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Edit user' : 'Add new user'}</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            {isEdit && <RHFTextField disabled name="username" label="Username" />}
            <Stack direction={'row'} spacing={2}>
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
            </Stack>
            {!isEdit && (
              <Stack direction={'row'} spacing={2}>
                <RHFTextField name="email" label="Email address" />
                <RHFTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            )}
            <RHFTextField name="zugangscode" label="Zugangscode" />
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

export default UsersFormDialog;
