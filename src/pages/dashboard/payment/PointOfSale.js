import { useState } from 'react';
import useSettings from '../../../hooks/useSettings';
import { TableHeadCustom } from '../../../components/table';
// _mock_
import { _appPatients } from '../../../_mock';
import { Box,
    Container,
    Stack,
    Typography,
    Grid,
    Card,
    CardHeader,
    Button,
    Table,
    TableBody,
    TableContainer,
    IconButton,
    Tooltip,
} from '@mui/material';
import Page from '../../../components/Page';
import Image from '../../../components/Image';
import Scrollbar from '../../../components/Scrollbar';
import PosPatientRow from './components/PosPatientRow';
import PosPayModal from './components/PosPayModal';
import ArrivalModal from './components/ArrivalModal';
import RefreshIcon from '@mui/icons-material/Refresh';
import PrintIcon from '@mui/icons-material/Print';


export default function PointOfSale() {
    const { themeStretch } = useSettings();

    const tableData = _appPatients;
    applySortByDate(tableData);

    const [payModalOpen, setPayModalOpen] = useState(false);
    const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
    const [loadingRowId, setLoadingRowId] = useState("");
    const [currentRow, setCurrentRow] = useState(null);

    const handleClickPay = (row) => {
        if(loadingRowId !== "")
            return;
        setCurrentRow(row);
        setPayModalOpen(true);
    };

    const handleClickArrival = (row) => {
        if(loadingRowId !== "")
            return;
        setCurrentRow(row);
        setArrivalModalOpen(true);
    };

    const handleConfirmArrived = (row) => {
        // TO-DO: set status based on backend response
        // row.status = "paid";
        setLoadingRowId(row.id);
        setArrivalModalOpen(false);
    }

    return (
        <Page title="Point of Sale">
          <Container maxWidth={themeStretch ? false : 'xl'} sx={{pb: 4}}>
            <PosPayModal
                open={payModalOpen}
                onClose={() => setPayModalOpen(false)}
                theRow={currentRow}
            />
            <ArrivalModal
                open={arrivalModalOpen}
                onClose={() => setArrivalModalOpen(false)}
                onConfirm={handleConfirmArrived}
                theRow={currentRow}
            />
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h3" component="h1" paragraph>
                    Point of Sale
                </Typography>
            </Stack>
            <Grid container sx={{ justifyContent: "space-between" }} spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card sx={{ p: 3 }}>
                        <Stack alignItems="flex-start">
                            <CardHeader title="Device Connection" sx={{ p: 0 }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }} >
                                Terminal_Berlin_001
                            </Typography>
                            <Image src={'/icons/pos_device.png'} sx={{ height: { xs: 60, xl: 80 }, marginTop: { xs: 2, xl: 3 } }} />
                            <Typography variant="body2" paragraph sx={{ marginTop: { xs: 1, xl: 2 } }} >
                                Status: <span style={{ color: '#B72136' /* success: 229A16 fail: B72136 */ }}>disconnected</span>
                            </Typography>
                            <Button variant="outlined">
                                Connect
                            </Button>
                        </Stack>
                    </Card>
                    <Typography variant="caption" paragraph sx={{ color: 'text.secondary', p: 2 }}>
                        This is the device, which is assigned to your account only.
                        To connect with other devices, please login with that account.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card sx={{ p: 3 }}>
                        <Stack alignItems="flex-start">
                            <Box sx={{ pl: 1, pr: 1, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <Box>
                                    <CardHeader title="Patients today" sx={{ p: 0 }} />
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }} >
                                        { (new Date()).toLocaleDateString("de-de", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
                                    </Typography>
                                </Box>
                                <Box>
                                    <Tooltip title="Print">
                                        <IconButton>
                                            <PrintIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refresh">
                                        <IconButton>
                                            <RefreshIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                            <Box sx={{ width:"100%", marginTop: 2 }}>
                                <Scrollbar sx={{}}>
                                    <TableContainer sx={{ minWidth: 600 }}>
                                        <Table>
                                            <TableHeadCustom headLabel={[
                                                { id: 'name', label: 'Name' },
                                                { id: 'session', label: 'Session' },
                                                { id: 'termin', label: 'Arrival' },
                                                { id: 'package', label: 'Package' },
                                                { id: 'status', label: 'Status' },
                                                { id: '' },
                                            ]} />

                                            <TableBody>
                                            {tableData.map((row) => (
                                                <PosPatientRow key={row.id} row={row} rowButtonLoading={loadingRowId === row.id} onPay={() => handleClickPay(row)} onArrival={() => handleClickArrival(row)} />
                                            ))}
                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                </Scrollbar>
                            </Box>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
          </Container>
    </Page>
  );
}

function applySortByDate(data)
{
    data.sort((a, b) => (a.termin - b.termin));
}   