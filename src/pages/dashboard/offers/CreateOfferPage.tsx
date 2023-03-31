import { useRef, useState } from 'react';
import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';
import { useCreateOffer, useLeadData, useOfferTemplateData, useOfferTemplates } from './offers.hooks';
import { useNavigate, useParams } from 'react-router';
import LoadingScreen from 'components/LoadingScreen';
import parse, { HTMLReactParserOptions, Element, domToReact, attributesToProps, Text } from 'html-react-parser';
import html from './html';
import EditableField from './components/EditableField';
import HideableField from './components/HideableField';
import { useCreateOfferContext, withCreateOfferProvider } from 'contexts/CreateOfferContext';
import Frame from 'react-frame-component';
import SelectTempleteModal from './components/SelectTempleteModal';
import Record from 'components/Record';
import { LoadingButton } from '@mui/lab';
import GenerateOfferDialog from './components/GenerateOfferDialog';

const getOptions = (lead, iframeRef) => (
  {
    replace: (domNode: Element) => {

      if (domNode?.attribs) {
        if (domNode.type === 'script') {
          const script = document.createElement('script');
          if (domNode.attribs.src) {
            // script.src = `${domNode.attribs.src}?v=${Date.now()}`;
            script.src = domNode.attribs.src;
            script.defer = true;
            // domNode.attribs.src = `${domNode.attribs.src}?v=${Date.now()}`;
          }
          // @ts-ignore
          script.appendChild(document.createTextNode(domNode.children[0]?.data));
          iframeRef.current.contentWindow.document.head.appendChild(script);
        }
        else if (domNode.attribs?.rel === 'stylesheet') {
          if (domNode.attribs.href && !domNode.attribs.href.includes("?")) {
            // domNode.attribs.href = `${domNode.attribs.href}?v=${Date.now()}`;
          }
        }

        let props = domNode.attribs;
        switch (domNode.attribs['data-type']) {
          case 'editable':
            if (domNode.children?.[0]?.type === 'text') {
              props = { ...domNode.attribs, 'default-text': (domNode.children[0] as Text).data, 'data-type': 'editable' };
            }
            return <EditableField {...props} lead={lead} component={domNode.name} />;
          case 'hideable':
            props = { ...props, 'data-type': 'hideable' }
            return (
              <HideableField
                {...props}
                component={domNode.name}
                children={domToReact(domNode.children, getOptions(lead, iframeRef))}
              />
            );
          case 'hidden':
            props = { ...props, 'data-type': 'hidden' }
            return <EditableField {...props} lead={lead} component={domNode.name} />;
          default:
        }
      }
      // return domNode as HTMLReactParserOptions;
    },
  }
);

function CreateOfferPage() {
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const { isPreview, toggleIsPreview, setIsPreview } = useCreateOfferContext();
  const [isSelectTemplateOpen, setIsSelectTemplateOpen] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<any>();
  const { id } = useParams();
  const { data: leadData, isLoading } = useLeadData(id);
  const { data: templates, isLoading: isLoadingTemplates } = useOfferTemplates();
  const { data: templateData, isLoading: isLoadingOffer } = useOfferTemplateData(selectedTemplate?.id);
  



  const {
    mutateAsync: createOfferAsync,
    isLoading: isCreatingOffer,
    isError: isCreatingFailed,
    data: generatedOffer,
  } = useCreateOffer();
  const iframeRef = useRef<HTMLIFrameElement>();
 
  const onGenerateClick = () => {
    if (!iframeRef.current) return;
    setIsPreview(true);
    setTimeout(() => {
      const htmlTag = iframeRef.current.contentWindow.document.getElementsByTagName('html')[0];
      const body = htmlTag.outerHTML;
      // console.log(document.getElementsByTagName('html'));
      const allDataFields = Array(...htmlTag.querySelectorAll('[data-id]'))
      const tempAllData = []
      allDataFields.forEach((ele) => {
        tempAllData.push({ 'data-id': ele.attributes[1].value, 'value': ele.innerHTML })
      });
      createOfferAsync({ templateId: 2, data: JSON.stringify(tempAllData) });
    });
  };


  const onCancelClick = () => {
    navigate('/dashboard');
  };
  if (isLoading || isLoadingTemplates) {
    return <LoadingScreen isDashboard={false} />;
  }
  if (!leadData) {
    return <div>No data</div>;
  }
  return (
    <Page title="Create new offer">
      <Container
        maxWidth={themeStretch ? false : 'xl'}
        style={{ display: 'flex', flexDirection: 'column', height: '96vh' }}
      >
        <Stack
          sx={{ my: 2 }}
          flexWrap={'wrap'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={2}
        >
          <Typography variant="h3" component="h1">
            {isPreview ? 'Preview' : 'Generate'} Offer
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <LoadingButton loading={isCreatingOffer} variant="contained" onClick={onGenerateClick}>
              Generate offer
            </LoadingButton>
            <Button variant="outlined" onClick={toggleIsPreview}>
              {isPreview ? 'Exit Preview' : 'Preview'}
            </Button>
            <Button variant="text" color="error" onClick={onCancelClick}>
              Cancel
            </Button>
          </Stack>
        </Stack>
        <SelectTempleteModal
          value={selectedTemplate}
          templates={templates}
          open={isSelectTemplateOpen}
          onClose={() => setIsSelectTemplateOpen(false)}
          onSubmit={({ template }) => setSelectedTemplate(template)}
        />
        {!isPreview && (
          <Card sx={{ mb: 3, p: 3 }}>
            <Grid container spacing={4} justifyContent="space-between">
              <Grid item>
                <Record label="ID" value={leadData.id} />
                <Record label="Name" value={leadData.Full_Name} />
              </Grid>
              <Grid item>
                <Record
                  label="Template"
                  value={selectedTemplate?.name}
                  valueProps={{
                    color: 'primary',
                    sx: { cursor: 'pointer', textDecoration: 'underline' },
                    onClick: () => setIsSelectTemplateOpen(true),
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        )}
        <Box style={{ flex: 1 }}>
          <Frame
            ref={iframeRef}
            width="100%"
            height={'100%'}
            frameBorder={0}
            head={<link rel="stylesheet" type="text/css" href={'/create-offer.css'} />}
          >
            {!!templateData?.body && parse(templateData?.body || '', getOptions(leadData, iframeRef))}
          </Frame>
        </Box>
        <GenerateOfferDialog
          loading={isCreatingOffer}
          offer={generatedOffer}
          errored={!!isCreatingFailed}
          onRetry={onGenerateClick}
        />
      </Container>
    </Page>
  );
}

export default withCreateOfferProvider(CreateOfferPage);
