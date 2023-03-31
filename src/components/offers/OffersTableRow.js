import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link } from '@mui/material';
// utils
import { fDate, fTimeStamp } from '../../utils/formatTime';
// components
import Label from '../Label';
import { TableMoreMenu } from '../table';
import { OfferStatus } from 'pages/dashboard/offers/offers.hooks';

// ----------------------------------------------------------------------

OffersTableRow.propTypes = {
  actions: PropTypes.node,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};

export default function OffersTableRow({ actions, row, selected, onSelectRow, onViewRow }) {
  const theme = useTheme();

  const { leadId, uid, type, createdDate, expiry, isAccepted, views, offerStatus } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Stack>
          <Typography variant="subtitle2" noWrap>
            leadId: {leadId}
          </Typography>

          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            offerId: {uid}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{fDate(createdDate)}</TableCell>

      <TableCell align="left">{fTimeStamp(expiry)}</TableCell>

      <TableCell align="left">{type}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (offerStatus === OfferStatus.Accepted && 'success') ||
            (offerStatus === OfferStatus.Expired && 'error') ||
            (offerStatus === OfferStatus.Read && 'secondary') ||
            (offerStatus === OfferStatus.Unread && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {
            offerStatus
          }
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu actions={actions} />
      </TableCell>
    </TableRow>
  );
}
