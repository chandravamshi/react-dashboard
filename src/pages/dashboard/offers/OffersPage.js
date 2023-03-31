import React from 'react';
import { Link } from 'react-router-dom';
// @mui
import {
    Container,
    Typography,
    Button,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function OffersPage()
{
    const { themeStretch } = useSettings();
    const [offerLang, setOfferLang] = React.useState('de');
    const [offerType, setOfferType] = React.useState('Default');

    const langChange = (event) => { setOfferLang(event.target.value); };
    const typeChange = (event) => { setOfferType(event.target.value); };

    return (
        <Page title="Offers">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Offers
                </Typography>
                <HeaderBreadcrumbs
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Offers' },
                    ]}
                    action={
                        <Button
                        variant="contained"
                        component={Link}
                        to={PATH_DASHBOARD.root}
                        startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                        New Offer
                        </Button>
                    }
                />
            </Container>
        </Page>
    );
}