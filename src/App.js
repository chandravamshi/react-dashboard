import './axiosConfig'
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ReactQueryDevtools } from 'react-query/devtools'
import Router from './routes';
import ThemeProvider from './theme';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import queryClient from './queryClient';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeColorPresets>
          <RtlLayout>
            <MotionLazyContainer>
              <ProgressBarStyle />

              <ScrollToTop />
              <Router />
              
              <ToastContainer />
            </MotionLazyContainer>
          </RtlLayout>
        </ThemeColorPresets>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </React.StrictMode>
  );
}
