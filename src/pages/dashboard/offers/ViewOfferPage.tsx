import { Container } from '@mui/material';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';
import { useOfferData } from './offers.hooks';
import {  useParams } from 'react-router';
import LoadingScreen from 'components/LoadingScreen';
import parse from 'html-react-parser';
import Frame from 'react-frame-component';


function ViewOfferPage() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const { data, isLoading } = useOfferData(id);
 
  if (isLoading) {
    return <LoadingScreen isDashboard={false} />;
  }
  if (!data.body) {
    return <div>No data</div>;
  }
  return (
    <Page title="View offer">
      <Container
        maxWidth={themeStretch ? false : 'xl'}
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <Frame width="100%" height={'100%'} frameBorder={0}>
          {parse(data.body || '')}
        </Frame>
      </Container>
    </Page>
  );
}

export default ViewOfferPage
