import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

OffersToolbar.propTypes = {
    filterName: PropTypes.string,
    filterStatus: PropTypes.string,
    filterOfferDate: PropTypes.instanceOf(Date),
    filterExpiration: PropTypes.instanceOf(Date),
    onFilterName: PropTypes.func,
    onFilterStatus: PropTypes.func,
    onFilterOfferDate: PropTypes.func,
    onFilterExpiration: PropTypes.func,
    statusOptions: PropTypes.arrayOf(PropTypes.string),
};

export default function OffersToolbar({
    filterName,
    filterStatus,
    filterOfferDate,
    filterExpiration,
    onFilterName,
    onFilterStatus,
    onFilterOfferDate,
    onFilterExpiration,
    statusOptions
})
{
    return (
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
            <TextField
                fullWidth
                select
                label="Status"
                value={filterStatus}
                onChange={onFilterStatus}
                SelectProps={{
                MenuProps: {
                    sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                },
                }}
                sx={{
                maxWidth: { md: INPUT_WIDTH },
                textTransform: 'capitalize',
                }}
            >
                {statusOptions.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                        }}
                    >
                    {option}
                </MenuItem>
                ))}
            </TextField>
            
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Offer date"
                    value={filterOfferDate}
                    onChange={onFilterOfferDate}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                        maxWidth: { md: INPUT_WIDTH },
                        }}
                    />
                    )}
                />

                <DatePicker
                    label="Expiration"
                    value={filterExpiration}
                    onChange={onFilterExpiration}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                        maxWidth: { md: INPUT_WIDTH },
                        }}
                    />
                    )}
                />
            </LocalizationProvider>

            <TextField
                fullWidth
                value={filterName}
                onChange={(event) => onFilterName(event.target.value)}
                placeholder="Search patient or offer ID..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    ),
                }}
            />
            </Stack>
    );
}