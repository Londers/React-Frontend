import React, {useEffect, useState} from "react";
import {Alert, Box, Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Tflight} from "./index";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {
    decrementAlertsNumber,
    incrementAlertsNumber,
    selectAlertsNumber
} from "../features/mapContainer/mapContentSlice";

function CustomAlert(props: { open: boolean, tflight: Tflight, num: number }) {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(props.open)
    const alertsNumber = useAppSelector(selectAlertsNumber)

    useEffect(() => {dispatch(incrementAlertsNumber())}, [])

    return (
        <Box key={props.num} sx={{
            width: "fit-content",
            position: "absolute",
            bottom: `${(alertsNumber - props.num) * 6}%`,
            right: "3%",
            zIndex: 1,
            userSelect: "none"
        }}>
            <Collapse in={open}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false)
                                dispatch(decrementAlertsNumber())
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    sx={{mb: 2, border: "1px solid"}}
                >
                    Ошибка входов, {props.tflight.region.num} {props.tflight.area.num} {props.tflight.ID}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default CustomAlert