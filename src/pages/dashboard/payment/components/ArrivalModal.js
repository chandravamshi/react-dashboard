import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    Divider,
    Box,
    Button,
} from '@mui/material';

ArrivalModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    theRow: PropTypes.any,
};

export default function ArrivalModal({open, onClose, onConfirm, theRow})
{
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ p: 3, pb: 0, pt: 2 }}>Arrival</DialogTitle>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ p: 3, pt: 0, pb: 2 }}>
                <Box>Patient is there?</Box>
                <Box sx={{ pt: 2, pb: 1 }}>
                    <Button variant="contained" onClick={() => {onConfirm(theRow)}} autoFocus>
                        Confirm
                    </Button>
                    <Button sx={{ ml: 2 }} color="error" variant="outlined" onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Dialog>
    );
}