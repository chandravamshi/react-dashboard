import { useState } from 'react';
import { Box, Container, Stack, Typography, Grid, Card, Divider, Hidden, Button } from '@mui/material';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import { sendPatientResetPasswordEmail, IPatient, usePatientData } from './patients.hooks';
import { useParams } from 'react-router';
import LoadingScreen from 'components/LoadingScreen';
import PatientInfoCard from './components/PatientInfoCard';
import PatientImagesCard from './components/PatientImagesCard';

export default function PatientDetailsPage() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const { data: patient, isLoading } = usePatientData(+id);
  const { firstName, lastName, avatar, email } = patient || {};

  const handleSendForgetEmailClick = () => {
    sendPatientResetPasswordEmail(email);
  };
  if (isLoading) {
    return <LoadingScreen isDashboard={false} />;
  }
  if (!patient) {
    return <div>No data</div>;
  }

  return (
    <Page title="Patient">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          sx={{ mb: 2 }}
          flexWrap={'wrap'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={2}
        >
          <Typography variant="h3" component="h1">
            Patient
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Button variant="contained">Send Zugangscode</Button>
            <Button variant="contained" onClick={handleSendForgetEmailClick}>
              Send reset password email
            </Button>
            <Button variant="contained" color="error">
              Block Account
            </Button>
          </Stack>
        </Stack>
        <PatientInfoCard patient={patient}  />
        <PatientImagesCard patient={patient} />
      </Container>
    </Page>
  );
}
