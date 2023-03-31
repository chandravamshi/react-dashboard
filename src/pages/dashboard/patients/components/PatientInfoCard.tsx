import { FC } from 'react';
import { Stack, Typography, Grid, Card, Divider, Hidden, Link } from '@mui/material';
import { IPatient } from '../patients.hooks';
import Avatar from 'components/Avatar';
import Record from 'components/Record';

interface PatientInfoCardProps {
  patient: IPatient;
}

const SectionsRow: FC = ({ children }) => (
  <Grid item container spacing={2}>
    {children}
  </Grid>
);

const Section: FC<{ title: string }> = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Typography variant="subtitle1">{title}</Typography>
    {children}
  </Grid>
);


export default function PatientInfoCard(props: PatientInfoCardProps) {
  const { patient } = props;
  const { firstName, lastName, avatarPath, avatar, email, methode, operationDate, bereich, grafts, zugangscode, phoneNumber } =
    patient || {};
  const fullName = [firstName, lastName].join(' ');

  return (
    <Card sx={{ mb: 3 }}>
      <Grid sx={{ px: 4, py: 2 }} container spacing={4}>
        <Grid item xs={12} md={4}>
          <Stack height={'100%'} direction={'row'}>
            <Stack flex={1} spacing={2}>
              <Stack alignItems={'center'} spacing={2}>
                <Avatar sx={{ width: 80, height: 80 }} alt={fullName} src={`${avatarPath}/${avatar}`} />
                <Typography variant="subtitle1">{fullName}</Typography>
              </Stack>
              <Stack>
                <Record label={'Email'}>
                  <Link href={`mailto:${email}`}>{email}</Link>
                </Record>
                <Record label={'Phone'} value={phoneNumber} />
                <Record label={'Birth Date'} value={'22.22.2222'} />
              </Stack>
              <Hidden mdUp>
                <Divider />
              </Hidden>
            </Stack>
            <Hidden mdDown>
              <Divider orientation="vertical" flexItem />
            </Hidden>
          </Stack>
        </Grid>
        <Grid item container xs={12} md={8} spacing={2}>
          <SectionsRow>
            <Section title="Operation">
              <Record label={'OP. Date'} value={operationDate} />
              <Record label={'Method'} value={methode} />
              <Record label={'Bereich'} value={bereich} />
              <Record label={'Grafts'} value={grafts} />
            </Section>
            <Section title="Status">
              <Record label={'Phase'} value={'1'} />
              <Record label={'Tasks'} value={'10 of 100'} />
              <Record label={'Last Upload'} value={'12.3.2203'} />
            </Section>
          </SectionsRow>
          <SectionsRow>
            <Section title="Flight">
              <Record label={'Ankunft'} value={'07.06.2022 - 13:30[TK-1374]'} />
              <Record label={'Rückflug'} value={'07.06.2022 - 13:30[TK-1374]'} />
            </Section>
            <Section title="App Usage">
              <Record label={'Last Login'} value={'324.232.3'} />
              <Record label={'Zugangscode'} value={zugangscode} />
            </Section>
          </SectionsRow>
        </Grid>
      </Grid>
    </Card>
  );
}
