import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
import { Box } from '@mui/material';

interface PageProps {
  title: string;
  children: ReactNode;
  meta?: ReactNode;
}

const Page = forwardRef<any, PageProps>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Elithair`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} sx={{ height: '100%' }} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
