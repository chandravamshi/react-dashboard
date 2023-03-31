import { useState } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../../components/Label';
import { TableMoreNew } from '../../../../components/table';
import Iconify from '../../../../components/Iconify';
import {
    Divider,
    MenuItem,
    TableCell,
    TableRow,
    Button,
    Typography,
    CircularProgress,
    Box,
} from '@mui/material';

PosPatientRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    termin: PropTypes.any,
    status: PropTypes.string,
    priceToday: PropTypes.number,
    totalRemaining: PropTypes.number,
    package: PropTypes.any,
    session: PropTypes.number,
    customerType: PropTypes.string,
    mesoSet: PropTypes.bool,
    service: PropTypes.string,
  }),
  onPay: PropTypes.func,
  onArrival: PropTypes.func,
  rowButtonLoading: PropTypes.bool
};

export default function PosPatientRow({ row, onPay, onArrival, rowButtonLoading})
{
    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
      setOpenMenuActions(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setOpenMenuActions(null);
    };
  
    const handleRefund = () => {
      handleCloseMenu();
      console.log('Refund', row.id);
    };
  
    const handlePrint = () => {
      handleCloseMenu();
      console.log('PRINT', row.id);
    };
  
    const handleDelete = () => {
      handleCloseMenu();
      console.log('DELETE', row.id);
    };
  
    return (
    <TableRow key={row.id}>
        <TableCell sx={{pb: 1, pt: 1}}>
          <Button variant='text' sx={{textAlign: "left", pl: 1, pr: 1, ml: -1 , display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.3}}>
            <Box sx={{position: "relative"}}>{row.name}
            {row.mesoSet &&
              <Box sx={{ position: "absolute", color: '#fff', backgroundColor: "#c00", left: "100%", ml: "4px", top: -7, width: "60px", borderRadius: "7px", fontSize: "0.78em", fontWeight: "normal", textAlign: "center", pt: "2px", pb: "2px"}}>
                Meso-Set
              </Box>
            }
            </Box>
            <Typography variant="caption" sx={{ mt: "2px", color: '#999' }}>
              {row.customerType}
            </Typography>
          </Button>
        </TableCell>
        
        <TableCell sx={{pb: 1, pt: 1}}>{row.session}</TableCell>

        <TableCell sx={{pb: 1, pt: 1}}>{`${row.termin.getHours().toString().padStart(2,"0")}:${row.termin.getMinutes().toString().padStart(2,"0")}`}</TableCell>

        <TableCell sx={{pb: 1, pt: 1, lineHeight: 1.2}}>
          <Box sx={{ display: "block"}}>{row.package.title}</Box>
          
          <Typography variant="caption" sx={{ display: "block", color: '#999' }}>
            {`${row.service  } ${row.package.subtitle || ""}`}
          </Typography>
        </TableCell>

        <TableCell sx={{pb: 1, pt: 1}}>
            <Label
                variant='filled'
                color={
                  ((row.status === 'unpaid' || row.status === 'waiting') && 'warning')
                  || 'success'
                }
            >
                {row.status}
            </Label>
        </TableCell>

        <TableCell sx={{pb: 1, pt: 1}} align="right">
        {
          (
            (row.status === 'waiting' || row.status === "unpaid") &&
            <Button variant="outlined" onClick={row.status === "waiting" ? onArrival : onPay} disabled={rowButtonLoading}>
                <Box sx={{color: (rowButtonLoading ? "#ddd" : "")}}>
                  {row.status === "waiting" ? "Arrived" : "Pay"}
                </Box>
                { rowButtonLoading && <CircularProgress sx={{ position: "absolute" }} size={20} /> }
            </Button>
          )
          ||
          <TableMoreNew 
              open={openMenu}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={
                  <>
                      <MenuItem onClick={handleRefund}>
                          <Iconify icon={'eva:refresh-fill'} />
                          Refund
                      </MenuItem>

                      <MenuItem onClick={handlePrint}>
                          <Iconify icon={'eva:printer-fill'} />
                          Print Receipt
                      </MenuItem>

                      <Divider sx={{ borderStyle: 'dashed' }} />

                      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                          <Iconify icon={'eva:trash-2-outline'} />
                          Remove Payment
                      </MenuItem>
                  </>
              }
            />
          }
        </TableCell>
      </TableRow>
    );
  }