import { FC, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Typography,
} from '@mui/material';
import _ from 'lodash';

type SelectTempleteModalProps = {
  value?: any;
  templates: any[];
  open: boolean;
  onClose: () => void;
  onSubmit: ({ template }) => void;
};

const SelectTempleteModal: FC<SelectTempleteModalProps> = ({ value = null, templates, open, onSubmit, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(value);
  useEffect(() => {
    setSelectedTemplate(value);
  }, [value]);
  const onSelect = (event, newField) => {
    setSelectedTemplate(newField);
  };
  const closeModal = () => {
    if (!selectedTemplate) return;
    onClose();
  };

  const handleSaveClick = () => {
    if (!selectedTemplate) return;
    onSubmit({ template: selectedTemplate });
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={closeModal}>
      <DialogTitle>{'Select Template'}</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 2 }} spacing={2}>
          <Autocomplete
            disableClearable
            value={selectedTemplate}
            options={templates}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Name" />}
            onChange={onSelect}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button disabled={!selectedTemplate} variant="contained" onClick={handleSaveClick}>
          Load
        </Button>
        <Button disabled={!value} color="inherit" variant="outlined" onClick={closeModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectTempleteModal;
