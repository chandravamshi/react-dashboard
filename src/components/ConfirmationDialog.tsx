import React, { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

type ConfirmationDialogProps = {
  loading?: boolean;
  variant?: "danger" | "info";
  title: string;
  description?: string;
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  loading,
  open,
  title,
  variant = "danger",
  description,
  onSubmit,
  onClose,
  children
}) => (
  <Dialog open={open}>
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      {description && <DialogContentText>{description}</DialogContentText>}
      {children}
    </DialogContent>

    <Divider />
    
    <DialogActions>
      {variant === "danger" && (
        <>
          <LoadingButton loading={loading} variant={'contained'} color="error" onClick={onSubmit}>
            Confirm
          </LoadingButton>
          <Button color="inherit" variant={'outlined'} onClick={onClose} autoFocus>
            Cancel
          </Button>
        </>
      )}

      {variant === "info" && (
        <Button variant={'outlined'} color="primary" onClick={onSubmit}>
          Okay
        </Button>
      )}
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;