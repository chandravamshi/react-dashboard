import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import { Box, Stack, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import cssStyles from 'utils/cssStyles';

interface ImageProps extends LazyLoadImageProps {
  disabledEffect?: boolean;
  ratio?: '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';
  sx?: SxProps;
}

const BlurredStack = styled(Stack)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ blur: 20, opacity: 0.1}),
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.common.white,
}));

export const BluredImage = (props: ImageProps & { blured?: boolean }) => {
  const { blured = true, ...rest } = props;
  const [isBlured, setIsBlured] = useState(!!blured);
  useEffect(() => setIsBlured(blured), [blured]);

  return (
    <Box position={'relative'}>
      <Image {...rest} />
      {isBlured && (
        <BlurredStack sx={{ cursor: 'pointer' }} onClick={() => setIsBlured(false)}>
          <VisibilityIcon fontSize={'large'} />
        </BlurredStack>
      )}
    </Box>
  );
};

export default function Image({ ratio, disabledEffect = false, effect = 'blur', sx, ...other }: ImageProps) {
  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <Box
          component={LazyLoadImage}
          wrapperClassName="wrapper"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc="https://zone-assets-api.vercel.app/assets/img_placeholder.svg"
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
          {...other}
        />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc="https://zone-assets-api.vercel.app/assets/img_placeholder.svg"
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
        {...other}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '1/1': '100%',
  }[ratio];
}
