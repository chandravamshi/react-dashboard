import { FC, useState } from 'react';
import { Box, styled } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCreateOfferContext } from 'contexts/CreateOfferContext';

type HideableFieldProps = {
  component: any;
  class?: string;
  id?: string;
  'data-default'?: 'hide' | 'show';
};

const HideableField: FC<HideableFieldProps> = ({ children, component, ...rest }) => {
  const { id, 'data-default': defaultValue, class: className = '' } = rest;
  const { isPreview } = useCreateOfferContext();
  const [hidden, setHidden] = useState(defaultValue === 'hide');
  const toggleHidden = () => setHidden((prev) => !prev);

  if (isPreview && hidden) return null;

  return (
    <Box
      id={id}
      component={component}
      className={isPreview ? `${className}` : `hideable-field ${className}`}
      style={isPreview ? {} : { opacity: hidden ? 0.5 : 1 }}
    >
      {children}
      {!isPreview && (
        <Box className="hide-button" component="span" onClick={toggleHidden}>
          {hidden ? <VisibilityOffIcon fontSize={'small'} /> : <VisibilityIcon fontSize={'small'} />}
        </Box>
      )}
    </Box>
  );
};

export default HideableField;
