import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

type RecordProps = {
  children?: React.ReactNode;
  label: string;
  value?: string | any;
  valueProps?: TypographyProps;
}

const Record: React.FC<RecordProps> = ({ label, value, valueProps, children }) => (
  <Typography variant="body2">
    <Typography fontSize={13} sx={{ mr: 1 }} component={'span'}>{`${label}:`}</Typography>
    <Typography fontSize={13} color={'GrayText'} component={'span'} {...valueProps}>
      {value || children}
    </Typography>
  </Typography>
);

export default React.memo(Record)