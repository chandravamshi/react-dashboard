import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Stack,
    DialogContent,
    Typography,
    Box,
    Fade,
    FormControl,
    InputAdornment,
    TextField
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import { fCurrency } from 'utils/formatNumber';
import Image from '../../../../components/Image';

PosPayModalContent.propTypes = {
    row: PropTypes.any,
};

export default function PosPayModalContent({row})
{
    const [step, setStep] = useState(null);
    const [waitingCard, setWaitingCard] = useState(true);
    const [waitingSolutions, setWaitingSolutions] = useState(true);
    const [cashInputValue, setCashInputValue] = useState("");

    useEffect(() => {
        if(step === "card")
        {
            // TO-DO: activate terminal to read the card
            setTimeout(() => {
                setWaitingCard(false);
            }, 2500);
        }
        else if(step === "cash")
        {
            setCashInputValue(fCurrency(row.price).replace(" €", ""));
        }
        else if(step === "solution")
        {
            // TO-DO: ask backend for possible options (postpone payment, pay partial, ...)
            setTimeout(() => {
                // setWaitingSolutions(false);
            }, 2500);
        }
    }, [step, row.price]);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", p: 3, pt: 0, pb: 2 }}>
                <Typography variant="body" sx={{ color: 'text.secondary' }} >
                    <Fade sx={{ position: "absolute" }} in={step === null}>
                        <Box>Select payment type</Box>
                    </Fade>
                    <Fade sx={{ position: "absolute"}} in={step === "cash" || step === "card"} style={{ transitionDelay: 300 }}>
                        <Box>Confirm payment</Box>
                    </Fade>
                    <Fade sx={{ position: "absolute"}} in={step === "solution"} style={{ transitionDelay: 300 }}>
                        <Box>Resolve problems</Box>
                    </Fade>
                </Typography>
                <Box sx={{ textAlign: "right" }}>
                    <Typography component="div" variant="caption" sx={{ color: 'text.secondary' }} >
                        {(row && row.name) || ""}
                    </Typography>
                    <Typography component="div" variant="caption" sx={{ color: 'text.secondary' }} >
                        {(row && row.price && fCurrency(row.price)) || ""}
                    </Typography>
                </Box>
            </Box>
            <DialogContent sx={{ minHeight: "300px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", pt: 0 }}>
                <Fade in={step === null}>
                    <Stack sx={{ mb: 4, flexDirection: "row", justifyContent: "center" }}>
                        <Button variant="outlined" onClick={() => {setStep("card")}} sx={{ fontSize: "18px", pt: 3, pb: 3, pl: 5, pr: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <PaymentIcon sx={{fontSize: "48px", mb: 1}} />
                            Card
                        </Button>
                        <Button variant="outlined" onClick={() => {setStep("cash")}} sx={{ fontSize: "18px", ml: 2, pt: 3, pb: 3, pl: 5, pr: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <PaidIcon sx={{fontSize: "48px", mb: 1}} />
                            Cash
                        </Button>
                        <Button variant="text" onClick={() => {setStep("solution")}} sx= {{position: "absolute", right: 10, bottom: 10, fontSize: "0.8em"}}>
                            Customer can't pay?
                        </Button>
                    </Stack>
                </Fade>
                <Fade in={step === "cash"} style={{ transitionDelay: 300, position: "absolute" }}>
                    <Stack sx={{ mt: -4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <FormControl sx={{ mb: 3, width: "125px" }} variant="outlined">
                            <TextField
                                id="cash-amount-input"
                                label="Amount"
                                value={cashInputValue}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">€</InputAdornment>
                                }}
                            />
                        </FormControl>
                        <Button variant="contained" sx={{pr: 4, pl: 4, pt: 2, pb: 2}}>
                            Apply payment
                            <CheckCircleIcon sx={{fontSize: "24px", ml: 1}} />
                        </Button>
                    </Stack>
                </Fade>
                <Fade in={step === "card"} style={{ transitionDelay: 300, position: "absolute" }}>
                    <Stack sx={{ mt: -3, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {
                            (waitingCard && <CircularProgress sx={{ mb: 4 }} />)
                            ||
                            <Image src={'/animations/pos.gif'} sx={{ height: { xs: 130, xl: 150 }, mb: 1}} />
                        }
                        <Typography>{(waitingCard && "Connecting to terminal...") || "Waiting for payment..."}</Typography>
                        <Button variant="outlined" color="error" sx={{mt: 3}}>
                            Cancel
                        </Button>
                    </Stack>
                </Fade>
                <Fade in={step === "solution"} style={{ transitionDelay: 300, position: "absolute" }}>
                    <Stack sx={{ mt: -3, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {
                            (waitingSolutions && <CircularProgress sx={{ mb: 4 }} />)
                            ||
                            <Image src={'/animations/pos.gif'} sx={{ height: { xs: 130, xl: 150 }, mb: 1}} />
                        }
                        <Typography>{(waitingSolutions && "Looking for possible solutions...") || "Waiting for payment..."}</Typography>
                    </Stack>
                </Fade>
            </DialogContent>
        </>
    );
}