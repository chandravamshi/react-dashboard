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
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useCreateOfferContext } from 'contexts/CreateOfferContext';
import { ILead } from '../offers.types';
import _ from 'lodash';

type DataSource = 'crm-only' | 'custom-only' | 'crm-custom';
type EditDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: ({ value, field }) => void;
  prefix: string;
  suffix: string;
  value: string;
  field?: string;
  lead: ILead;
  dataSource: DataSource;
  disabled: boolean;
};

const getSourceText = (dataSource: DataSource) => {
  switch (dataSource) {
    case 'crm-only':
      return 'CRM only';
    case 'custom-only':
      return 'Custom';
    case 'crm-custom':
      return 'CRM or Custom';
    default:
      return 'Unknown data source';
  }
};

const concatStrings = (strings: string[]) => strings.filter(Boolean).join('');

const getFieldText = (fieldName: string, lead: ILead) => {
  const field = _.get(lead, fieldName, '');
  let text;
  if (Array.isArray(field)) {
    text = _.map(field, "value").join(", ");
  } else if (typeof field === 'object') {
    text = field?.value;
  } else {
    text = field;
  }
  return text || '';
};

const filterValue = (value: string, dataFormat: string) => {
  if(dataFormat === "date" && Date.parse(value))
  {
    return new Date(value).toLocaleDateString("DE", {year: "numeric", month: "2-digit", day: "2-digit"});
  }
  return value;
}

const EditDialog = (props: EditDialogProps) => {
  const { dataSource, disabled } = props;
  const [field, setField] = useState(props.field);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  useEffect(() => {
    setField(props.field);
  }, [props.field]);

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const handleSaveClick = () => {
    props.onSubmit({ value, field });
    props.onClose();
  };

  const onSelect = (event, newFieldName) => {
    setField(newFieldName);
    const newValue = getFieldText(newFieldName, props.lead);
    setValue(newValue);
  };

  const handleCancelClick = () => {
    setField(props.field);
    setValue(props.value);
    props.onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={props.open} onClose={props.onClose}>
      <DialogTitle>{'Edit value'}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }} fontSize={14} color={'GrayText'}>
          Source: {getSourceText(dataSource)}
        </Typography>
        <Stack sx={{ mt: 1 }} spacing={2}>
          {dataSource !== 'custom-only' && (
            <Autocomplete
              disableClearable
              disabled={disabled}
              value={field}
              options={Object.keys(props.lead)}
              renderInput={(params) => <TextField {...params} label="Attributes" />}
              onChange={onSelect}
            />
          )}
          <FormControl variant="outlined">
            <InputLabel htmlFor="editable-field-value-input">Value</InputLabel>
            <OutlinedInput
              id="editable-field-value-input"
              disabled={dataSource === 'crm-only'}
              autoFocus
              value={value}
              label={'Value'}
              onChange={onChange}
              startAdornment={
                <InputAdornment position="start">
                  <Typography sx={{ color: 'text.disabled' }}>{props.prefix}</Typography>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Typography sx={{ color: 'text.disabled' }}>{props.suffix}</Typography>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="contained" onClick={disabled ? props.onClose : handleSaveClick}>
          {disabled ? 'Close' : 'Save'}
        </Button>
        <Button color="inherit" variant="outlined" onClick={handleCancelClick}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type EditableFieldProps = {
  class?: string;
  component: any;
  lead: ILead;
  id?: string;
  'data-source'?: DataSource;
  'data-default-field'?: string;
  'data-prefix'?: string;
  'data-suffix'?: string;
  'data-format'?: string;
  'data-disabled'?: boolean;
  'default-text'?: string;
  'data-id'?: string;
};

const EditableField: FC<EditableFieldProps> = ({ component, lead, ...rest }) => {
  // console.log(rest)
  
  const {
    id,
    'data-id':dataId,
    'data-default-field': defaultField,
    'data-source': dataSource,
    'data-prefix': prefix,
    'data-suffix': suffix,
    'data-format': format,
    'default-text': defaultText,
    class: className = '',
  } = rest;
  const disabled = Object.hasOwn(rest, 'data-disabled');
  const { isPreview } = useCreateOfferContext();
  const [field, setField] = useState(defaultField);
  const [value, setValue] = useState(filterValue(getFieldText(field, lead) || defaultText, format));
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  const emptyText = isPreview ? '' : '---';

  const onSubmit = (values: { value: string; field: string }) => {
    setValue(filterValue(values.value, format));
    setField(values.field);
  };
  return (
    <>
      <Box
        id={id}
        data-id={dataId}
        className={isPreview ? `${className}` : `editable-field ${className}`}
        onClick={onOpen}
        component={component}
      >
        {concatStrings([prefix, value || emptyText, suffix])}
      </Box>
      {!isPreview && (
        <EditDialog
          value={value}
          field={field}
          prefix={prefix}
          suffix={suffix}
          dataSource={dataSource}
          disabled={disabled}
          lead={lead}
          open={open}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default EditableField;
