import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Box,
    Tab,
    Tabs,
    Grid,
    Card,
    Table,
    Stack,
    colors,
    Button,
    Select,
    Switch,
    Divider,
    Tooltip,
    MenuItem,
    TableBody,
    FormGroup,
    Typography,
    IconButton,
    CardContent,
    InputLabel,
    FormControl,
    TableContainer,
    TablePagination,
    FormControlLabel,
} from '@mui/material';
// hooks
import useTabs from '../../hooks/useTabs';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// example data
import { _offers } from '../../_mock';
// components
import Label from '../Label';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import OffersToolbar from './OffersToolbar';
import OffersAnalytic from './OffersAnalytic';
import OffersTableRow from './OffersTableRow';
import TableHeadCustom from '../table/TableHeadCustom';
import TableSelectedActions from '../table/TableSelectedActions';
import { TableEmptyRows, TableSearchNotFound } from '../table';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
    'all',
    'read',
    'unread',
    'expired',
];

const TABLE_HEAD = [
    { id: 'patient', label: 'Patient', align: 'left' },
    { id: 'offerDate', label: 'Offer Date', align: 'left' },
    { id: 'expiration', label: 'Expiration', align: 'left' },
    { id: 'type', label: 'Offer Type', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
];

export default function OffersList()
{
    // ...
    // TO-DO: fetch and parse data
    // ...

    // Table settings
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({ defaultOrderBy: 'offerDate' });

    const [tableData, setTableData] = useState(_offers);

    const [filterName, setFilterName] = useState('');
  
    const [filterStatus, setfilterStatus] = useState('all');
  
    const [filterOfferDate, setfilterOfferDate] = useState(null);
  
    const [filterExpiration, setfilterExpiration] = useState(null);
  
    const { currentTab: filterCurrent, onChangeTab: onFilterCurrent } = useTabs('all');

    const TABS = [
        { value: 'all', label: 'All', color: 'info', count: tableData.length },
        { value: 'read', label: 'Read', color: 'success', count: 30 },
        { value: 'unread', label: 'Unread', color: 'error', count: 10 },
        { value: 'expired', label: 'Expired', color: 'warning', count: 2 },
    ];


    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };
    
    const handleFilterStatus = (event) => {
        setfilterStatus(event.target.value);
      };
    
    const handleDeleteRow = (id) => {
        // const deleteRow = tableData.filter((row) => row.id !== id);
        // setSelected([]);
        // setTableData(deleteRow);
    };

    const handleDeleteRows = (selected) => {
        // const deleteRows = tableData.filter((row) => !selected.includes(row.id));
        // setSelected([]);
        // setTableData(deleteRows);
    };

    const handleEditRow = (id) => {
        // navigate(PATH_DASHBOARD.invoice.edit(id));
    };

    const handleViewRow = (id) => {
        // navigate(PATH_DASHBOARD.invoice.view(id));
    };

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterStatus,
        filterOfferDate,
        filterExpiration,
    });

    const isNotFound = !dataFiltered.length;

    
    return (
        <Box>
            <Card sx={{ mb: 3, mt: 5 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    divider={<Divider orientation="vertical" flexItem />}
                    sx={{ py: 2 }}
                    >
                        <OffersAnalytic
                            title="Total sent"
                            total={TABS[0].count}
                            percent={100}
                            icon="ic:round-receipt"
                            color={colors.blue[600]}
                        />
                        <OffersAnalytic
                            title="Read"
                            total={TABS[1].count}
                            percent={TABS[1].count / TABS[0].count * 100}
                            icon="fa:envelope-open"
                            color={colors.green[600]}
                        />
                        <OffersAnalytic
                            title="Unread"
                            total={TABS[2].count}
                            percent={TABS[2].count / TABS[0].count * 100}
                            icon="fa:envelope"
                            color={colors.red[600]}
                        />
                        <OffersAnalytic
                            title="Expired"
                            total={TABS[3].count}
                            percent={TABS[3].count / TABS[0].count * 100}
                            icon="ic:outline-access-time-filled"
                            color={colors.grey[600]}
                        />
                </Stack>
            </Card>
            <Card>
                <Tabs
                    allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"
                    value={filterCurrent}
                    onChange={onFilterCurrent}
                    sx={{ px: 2, bgcolor: 'background.neutral' }}
                    >
                    {TABS.map((tab) => (
                        <Tab
                        disableRipple
                        key={tab.value}
                        value={tab.value}
                        label={
                            <Stack spacing={1} direction="row" alignItems="center">
                                <div>{tab.label}</div> <Label color={tab.color}> {tab.count} </Label>
                            </Stack>
                        }
                        />
                    ))}
                </Tabs>

                <Divider />

                <OffersToolbar
                    filterOfferDate={filterOfferDate}
                    filterExpiration={filterExpiration}
                    filterName={filterName}
                    onFilterOfferDate={(newValue) => {
                        setfilterOfferDate(newValue);
                    }}
                    onFilterExpiration={(newValue) => {
                        setfilterExpiration(newValue);
                    }}
                    onFilterName={handleFilterName}
                    onFilterStatus={handleFilterStatus}
                    statusOptions={STATUS_OPTIONS}
                />

                <Scrollbar>
                <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                    {selected.length > 0 && (
                    <TableSelectedActions
                        dense={dense}
                        numSelected={selected.length}
                        rowCount={tableData.length}
                        onSelectAllRows={(checked) =>
                            onSelectAllRows(
                                checked,
                                tableData.map((row) => row.id)
                            )
                        }
                        actions={
                        <Stack spacing={1} direction="row">
                            <Tooltip title="Download PDF">
                            <IconButton color="primary">
                                <Iconify icon={'eva:download-outline'} />
                            </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                            <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                                <Iconify icon={'eva:trash-2-outline'} />
                            </IconButton>
                            </Tooltip>
                        </Stack>
                        }
                    />
                    )}

                    <Table size={dense ? 'small' : 'medium'}>
                    <TableHeadCustom
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={tableData.length}
                        numSelected={selected.length}
                        onSort={onSort}
                        onSelectAllRows={(checked) =>
                        onSelectAllRows(
                            checked,
                            tableData.map((row) => row.id)
                        )
                        }
                    />

                    <TableBody>
                        {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <OffersTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => onSelectRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                            actions={
                            <>
                                <MenuItem onClick={() => handleDeleteRow(row.id)} sx={{ color: 'error.main' }}>
                                <Iconify icon={'eva:trash-2-outline'} />
                                    Delete
                                </MenuItem>

                                <MenuItem onClick={() => handleViewRow(row.id)}>
                                <Iconify icon={'eva:eye-fill'} />
                                    View
                                </MenuItem>

                                <MenuItem onClick={() => handleEditRow(row.id)}>
                                <Iconify icon={'eva:edit-fill'} />
                                    Edit
                                </MenuItem>
                            </>
                            }
                        />
                        ))}

                        <TableEmptyRows height={dense ? 56 : 76} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />
                    </TableBody>

                    {isNotFound && <TableSearchNotFound />}
                    </Table>
                </TableContainer>
                </Scrollbar>

                <Box sx={{ position: 'relative' }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={dataFiltered.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                    />

                    <FormControlLabel
                        control={<Switch checked={dense} onChange={onChangeDense} />}
                        label="Dense"
                        sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
                    />
                </Box>
            </Card>
        </Box>
    );
}


function applySortFilter({
    tableData,
    comparator,
    filterName,
    filterStatus,
    filterOfferDate,
    filterExpiration,
    })
{
    const stabilizedThis = tableData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    tableData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        tableData = tableData.filter(
        (item) =>
            item.offerID.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            item.patient.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    if (filterStatus !== 'all') {
        tableData = tableData.filter((item) => item.status === filterStatus);
    }

    if (filterOfferDate) {
        tableData = tableData.filter(
        (item) =>
            item.createDate.getTime() === filterOfferDate.getTime()
        );
    }

    if(filterExpiration) {
        tableData = tableData.filter(
        (item) =>
            item.expiration.getTime() === filterExpiration.getTime()
        );
    }

    return tableData;
}