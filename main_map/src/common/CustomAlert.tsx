import React, {useState} from "react";
import {Alert, Box, Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Tflight} from "./index";

function CustomAlert(props: { open: boolean, tflight: Tflight, num: number, bottom: number, close: Function }) {
    const [open, setOpen] = useState(props.open)

    return (
        <Box key={props.num} sx={{
            width: "fit-content",
            position: "absolute",
            bottom: `${props.bottom}%`,
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
                                setTimeout(() => props.close(props.num), 300)
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