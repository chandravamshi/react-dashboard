import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  DialogContentText,
  CircularProgress,
  OutlinedInput,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { useCopyToClipboard } from 'usehooks-ts';
import { toast } from 'react-toastify';
import { PUBLIC_OFFERS_URL } from 'config';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router';

type GenerateOfferDialogProps = {
  offer: { uid: string } | any;
  loading: boolean;
  errored: boolean;
  onRetry: () => void;
};

const GenerateOfferDialog: FC<GenerateOfferDialogProps> = ({ loading, errored, offer, onRetry }) => {
  const navigate = useNavigate()
  const { palette } = useTheme()
  const [_, copyToClipboard] = useCopyToClipboard();
  

  const onDoneClick = () => {
    if(window.history.length > 1) {
      window.history.back()
    } else {
      navigate('/');
    }
  };
  const onCopyClick = () => {
    copyToClipboard(url);
    toast.success('Copied');
  };
  const onRetryClick = () => {
    onRetry();
  };
  const getDetails = () => {
    if (loading) {
      return {
        title: 'Generating the offer...',
        description: 'Please wait while the link is being generated.',
      };
    }
    if (errored) {
      return {
        title: 'An error occurred',
        description: 'Please try again later',
      };
    }
    return {
      title: 'Generated',
      description: 'The offer has been generated. You can copy the link below.',
      url: offer?.uid && `${PUBLIC_OFFERS_URL}?id=${offer?.uid}`,
    };
  };
  const { title, description, url } = getDetails();

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog open={Boolean(loading || errored || offer)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ my: 2 }}>{description}</DialogContentText>
        {loading && (
          <Box display={'flex'} justifyContent={'center'}>
            <CircularProgress />
          </Box>
        )}
        {url && (
          <OutlinedInput
            fullWidth
            disabled
            value={url}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={onCopyClick} onMouseDown={handleMouseDown} edge="end">
                  <ContentCopyIcon  sx={{ color: `${palette.primary.main} !important`}} />
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      </DialogContent>

      <Divider />

      <DialogActions>
        {errored ? (
          <Button disabled={loading} variant={'contained'} color="error" onClick={onRetryClick}>
            Try again
          </Button>
        ) : (
          <Button disabled={loading} variant={'contained'} color="primary" onClick={onDoneClick}>
            Done
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenerateOfferDialog;
