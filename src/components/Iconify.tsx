import PropTypes from 'prop-types';
// icons
import { Icon, IconifyIcon, IconifyIconProps } from '@iconify/react';
// @mui
import { Box } from '@mui/material';
import { ElementType } from 'react';

// ----------------------------------------------------------------------


interface IconifyProps extends IconifyIconProps {
  sx?: object;
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box<ElementType<IconifyIconProps>> component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
