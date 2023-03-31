import { FC, useEffect, useState } from 'react';
import { Stack, Typography, Card, Divider, Button, ButtonProps, Box, styled } from '@mui/material';
import { IPatient } from '../patients.hooks';
import Image from 'components/Image';
import { grey } from '@mui/material/colors';
import LightboxModal from 'components/LightboxModal';

interface PatientImagesCardProps {
  patient: IPatient;
}

type ImageWithLabelProps = {
  label: string;
  src: string;
  labelPosition?: 'top' | 'bottom'; // Default: bottom
  handleOpenLightbox: (src: string) => void;
};
const ImageWithLabel: FC<ImageWithLabelProps> = ({ label, labelPosition = 'bottom', src, handleOpenLightbox }) => (
  <Stack alignItems={'center'} sx={{ flex: 1, px: 2, py: 2 }}>
    {labelPosition === 'top' && <Typography sx={{ mb: 1 }}>{label}</Typography>}
    <Image key={src} src={src} sx={{ cursor: 'pointer', maxHeight: 250 }} onClick={() => handleOpenLightbox(src)} />
    {labelPosition === 'bottom' && <Typography sx={{ mt: 1 }}>{label}</Typography>}
  </Stack>
);

const RecordsHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
  backgroundColor: grey[100],
  zIndex: 2,
  color: 'GrayText',
}));

const RecordsContainer = styled(Typography)(({ theme }) => ({
  overflow: 'auto',
  height: '100%',
  position: 'absolute',
  width: '100%',
  paddingTop: 60,
}));

const RecordButton: FC<ButtonProps & { selected?: boolean; text: string }> = ({ selected, text, ...rest }) => (
  <Button
    variant="text"
    color="inherit"
    sx={{
      py: 2,
      borderRadius: 0,
      width: '100%',
      backgroundColor: selected ? grey[300] : 'inherit',
    }}
    {...rest}
  >
    <Typography variant="body2">{text}</Typography>
  </Button>
);

export default function PatientImagesCard(props: PatientImagesCardProps) {
  const { patient } = props;
  const { imagesRecords = [] } = patient || {};
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedRecord = imagesRecords?.[selectedIndex];
  const { image1, image2, image3, image4, image5 } = selectedRecord || {};

  // For Ligth box
  const imagesLightbox = selectedRecord ? [image1, image2, image3] : [];
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [imagesRecords]);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Stack>
      <Typography sx={{ m: 1 }} variant="subtitle1">
        Uploaded Photos
      </Typography>
      <Card>
        <Stack direction={'row'}>
          <Stack sx={{ backgroundColor: grey[100], position: 'relative' }}>
            <RecordsHeader variant="body2">{selectedRecord ? 'Select Month' : '---'}</RecordsHeader>
            <RecordsContainer>
              {imagesRecords?.map((item, index) => {
                const selected = selectedIndex === index;
                const onClick = () => setSelectedIndex(index);
                return (
                  <RecordButton
                    key={`patient-records-${item.id}`}
                    text={item.uploadMonth}
                    selected={selected}
                    onClick={onClick}
                  />
                );
              })}
            </RecordsContainer>
          </Stack>
          <Stack flex={1} flexDirection="row" flexWrap={'wrap'}>
            {selectedRecord ? (
              <>
                <ImageWithLabel label={'Front'} src={image1} handleOpenLightbox={handleOpenLightbox} />
                <Divider orientation="vertical" />
                <ImageWithLabel label={'Back'} src={image2} handleOpenLightbox={handleOpenLightbox} />
                <Divider orientation="vertical" />
                <ImageWithLabel label={'Top'} src={image3} handleOpenLightbox={handleOpenLightbox} />
                <Divider orientation="vertical" />
                <ImageWithLabel label={'Left'} src={image4} handleOpenLightbox={handleOpenLightbox} />
                <Divider orientation="vertical" />
                <ImageWithLabel label={'Right'} src={image5} handleOpenLightbox={handleOpenLightbox} />
              </>
            ) : (
              <Typography sx={{ p: 2 }} textAlign={'center'}>
                There is no data to show
              </Typography>
            )}
          </Stack>
        </Stack>
      </Card>
      <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </Stack>
  );
}
