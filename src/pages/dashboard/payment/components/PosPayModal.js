import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    Divider,
} from '@mui/material';
import PosPayModalContent from './PosPayModalContent';

PosPayModal.propTypes = {
    theRow: PropTypes.any,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default function PosPayModal({theRow, open, onClose})
{
    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
            <DialogTitle sx={{ p: 3, pb: 0, pt: 2 }}>Checkout</DialogTitle>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <PosPayModalContent
                row={theRow}
            />
        </Dialog>
    );
}