import {Alert, Box, Collapse, IconButton} from "@mui/material";
import React, {useEffect} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import CloseIcon from '@mui/icons-material/Close';
import {decrementAlertsNumber, incrementAlertsNumber, selectAlertsNumber} from "../../mapContentSlice";

function ConnectionListBox() {
    const dispatch = useAppDispatch()

    const [open, setOpen] = React.useState(true);

    const statusS = useAppSelector(state => state.mapContent.statusS)
    const statusBD = useAppSelector(state => state.mapContent.statusBD)

    useEffect(() => {
        setOpen(true)
        if (!statusS || !statusBD) dispatch(incrementAlertsNumber())
    }, [statusS, statusBD])

    return (
        <>
            {(!statusS || !statusBD) &&
                <Box sx={{ width: 'fit-content', position: "absolute", bottom: `${6}%`, right: "3%", zIndex: 1, userSelect: "none"}}>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        dispatch(decrementAlertsNumber())
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, border: "1px solid" }}
                        >
                            Ошибка связи с {!statusS ? "сервером" : "базой данных"}
                        </Alert>
                    </Collapse>
                </Box>
            }
            <ListBox data={{content: "Связь"}} options={{floatIndex: 5}}>
                <ListBoxItem options={{selectOnClick: false}} state={{selected: statusBD}}
                             data={{content: "Состояние связи с базой"}}/>
                <ListBoxItem options={{selectOnClick: false}} state={{selected: statusS}}
                             data={{content: "Состояние связи с сервером"}}/>
            </ListBox>
        </>
    )
}

export default ConnectionListBox