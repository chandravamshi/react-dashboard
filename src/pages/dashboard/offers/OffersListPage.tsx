import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Card, colors, Container, Divider, FormControlLabel, IconButton, MenuItem, Stack, Switch, Table, TableBody, TableContainer, TablePagination, Tooltip, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';
import { useSearchByKeys } from 'hooks/useSearch';
import useTabs from 'hooks/useTabs';
import useTable, { emptyRows, getComparator } from 'hooks/useTable';
import { PATH_DASHBOARD } from 'routes/paths';
import { OfferStatus, useOfferList } from './offers.hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Iconify from 'components/Iconify';
import { TableEmptyRows, TableHeadCustom, TableSearchNotFound, TableSelectedActions } from 'components/table';
import OffersTableRow from 'components/offers/OffersTableRow';
import Scrollbar from 'components/Scrollbar';
import OffersToolbar from 'components/offers/OffersToolbar';
import OffersAnalytic from 'components/offers/OffersAnalytic';
import { fDate, fTimestamp, fTimeStamp } from 'utils/formatTime';
import { CsvBuilder } from 'filefy';


export default function OffersListPage() {
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

  const { data = [], isLoading } = useOfferList();

  const { themeStretch } = useSettings();

  const [pageSize, setPageSize] = useState(25);

  const [filterName, setFilterName] = useState('');

  const [filterStatus, setfilterStatus] = useState('all');

  const [filterOfferDate, setfilterOfferDate] = useState(null);

  const [filterExpiration, setfilterExpiration] = useState(null);

  const navigate = useNavigate();

  const { currentTab: filterCurrent, onChangeTab: onFilterCurrent } = useTabs('all');

  const [searchText, setSearchText] = useState('');

  const [debouncedSearchText] = useDebounce(searchText, 400);

  let readCounter = 0
  let unreadCounter = 0
  let expiredCounter = 0
  let acceptedCounter = 0

  const parseCounter = () => {
    data.forEach((element) => {
      if (element.isAccepted === true) {
        acceptedCounter += 1;
        element.offerStatus = OfferStatus.Accepted;
        return;
      }
      if (element.expiry <= new Date().getTime()) {
        expiredCounter += 1;
        element.offerStatus = OfferStatus.Expired;
        return;
      }
      if (element.views > 0) {
        readCounter += 1;
        element.offerStatus = OfferStatus.Read;
        return;
      }
      if (element.views <= 0) {
        unreadCounter += 1;
        element.offerStatus = OfferStatus.Unread;
      }
    })
  }

  parseCounter();

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: data.length },
    { value: OfferStatus.Read, label: 'Read', color: 'secondary', count: readCounter },
    { value: OfferStatus.Unread, label: 'Unread', color: 'warning', count: unreadCounter },
    { value: OfferStatus.Expired, label: 'Expired', color: 'error', count: expiredCounter },
    { value: OfferStatus.Accepted, label: 'Accepted', color: 'success', count: acceptedCounter },
  ];

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    navigate(PATH_DASHBOARD.general.offersById.replace(':id', id));
  };

  const dataFiltered = applySortFilter({
    data,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
    filterOfferDate,
    filterExpiration,
  });

  const isNotFound = !dataFiltered.length;

  const TABLE_HEAD = [
    { id: 'leadId', label: 'Patient', align: 'left' },
    { id: 'createdDate', label: 'Offer Date', align: 'left' },
    { id: 'expiry', label: 'Expiration', align: 'left' },
    { id: 'type', label: 'Offer Type', align: 'left' },
    { id: 'offerStatus', label: 'Status', align: 'left' },
    { id: 'language', label: 'Lang', align: 'left' },
  ];


  const STATUS_OPTIONS = [
    'all',
    OfferStatus.Read,
    OfferStatus.Unread,
    OfferStatus.Expired,
    OfferStatus.Accepted
  ];
  const filteredData = useSearchByKeys(debouncedSearchText, data, ['fullName', 'email']);
  const exportAllSelectedRows = () => {
    const selectedRows = dataFiltered.filter((data, index) => data.id === selected[index])
    // selectedRows.forEach(element => {
    //   element.createdDate = fDate(element.createdDate);
    //   element.expiry = fDate(fTimestamp(Number(element.expiry)));
    // });
    const csvBuilder = new CsvBuilder("user_list.csv")
      // console.log(seletedRows)
      .setColumns(TABLE_HEAD.map(col => col.label))
      .addRows(selectedRows.map(rowData => TABLE_HEAD.map(col => rowData[col.id])))
      .exportFile();
  }


  return (
    <Page title="Offers List">
      <Container
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        maxWidth={themeStretch ? false : 'xl'}
      >
        <Typography variant="h3" component="h1" paragraph>
          Offers
        </Typography>
        <HeaderBreadcrumbs
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Offers' },
          ]}
          action={<Button
            variant="contained"
            component={Link}
            to={PATH_DASHBOARD.root}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New Offer
          </Button>}
          heading={undefined} sx={undefined} />
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
                color={colors.indigo[600]}
              />
              <OffersAnalytic
                title="Unread"
                total={TABS[2].count}
                percent={TABS[2].count / TABS[0].count * 100}
                icon="fa:envelope"
                color={colors.amber[600]}
              />
              <OffersAnalytic
                title="Expired"
                total={TABS[3].count}
                percent={TABS[3].count / TABS[0].count * 100}
                icon="ic:outline-access-time-filled"
                color={colors.red[600]}
              />
              <OffersAnalytic
                title="Accepted"
                total={TABS[4].count}
                percent={TABS[4].count / TABS[0].count * 100}
                icon="ic:outline-access-time-filled"
                color={colors.green[600]}
              />
            </Stack>
          </Card>
          <Card>
            {/* <Tabs
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
            </Tabs> */}

            <Divider />

            <OffersToolbar
              filterOfferDate={filterOfferDate}
              filterExpiration={filterExpiration}
              filterName={filterName}
              filterStatus={filterStatus}
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

            <Scrollbar sx={{ minWidth: 800, position: 'relative' }}>
              <TableContainer>
                {selected.length > 0 && (
                  <TableSelectedActions
                    dense={dense}
                    numSelected={selected.length}
                    rowCount={data.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        data.map((row) => row)
                      )
                    }
                    actions={
                      <Stack spacing={1} direction="row">
                        <Tooltip title="Download PDF">
                          <IconButton color="primary" onClick={() => exportAllSelectedRows()}>
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
                    rowCount={data.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        data.map((row) => row)
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
                        onViewRow={() => handleViewRow(row.uid)}
                        actions={
                          <>
                            <MenuItem onClick={() => handleDeleteRow(row.id)} sx={{ color: 'error.main' }}>
                              <Iconify icon={'eva:trash-2-outline'} />
                              Delete
                            </MenuItem>

                            <MenuItem onClick={() => handleViewRow(row.uid)}>
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

                    <TableEmptyRows height={dense ? 56 : 76} emptyRows={emptyRows(page, rowsPerPage, data.length)} />
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
      </Container>
    </Page>
  );
}
function applySortFilter({
  data,
  comparator,
  filterName,
  filterStatus,
  filterOfferDate,
  filterExpiration,
}) {
  const stabilizedThis = data.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  data = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    data = data.filter(
      (item) =>
        item.uid.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.leadId.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    data = data.filter((item) => item.offerStatus === filterStatus);
  }

  if (filterOfferDate) {
    data = data.filter(
      (item) =>
        fDate(item.createdDate) === fDate(filterOfferDate)
    );
  }

  if (filterExpiration) {
    data = data.filter(
      (item) =>
        fTimeStamp(item.expiry) === fTimeStamp(filterExpiration)
    );
  }

  return data;
}