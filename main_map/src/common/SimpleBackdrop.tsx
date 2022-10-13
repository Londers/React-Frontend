import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect} from "react";
import {useAppSelector} from "../app/hooks";
import {selectTFLights} from "../features/mapContainer/mapContentSlice";
// import Button from '@mui/material/Button';

function SimpleBackdrop() {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const tflightsLength = useAppSelector(selectTFLights).length

    useEffect(() => {
        setOpen(tflightsLength === 0)
    }, [tflightsLength])

    return (
        <div>
            {/*<Button onClick={handleToggle}>Show backdrop</Button>*/}
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}

export default SimpleBackdrop