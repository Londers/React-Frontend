import React, {ChangeEvent, useContext, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectFragments} from "../mapContainer/acccountSlice";
import {wsSendMessage} from "../../common/Middlewares/WebSocketMiddleware";
import {MapContext} from "../mapContainer/MapContainer";

function CreateFragmentDialog(props: { open: boolean, setOpen: Function }) {
    const [open, setOpen] = [props.open, props.setOpen]
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const fragments = useAppSelector(selectFragments)
    const dispatch = useAppDispatch()

    const map = useContext(MapContext)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleSubmit = () => {
        if (fragments.some(fragment => fragment.name === name)) {
            setError(true)
        } else {
            dispatch(wsSendMessage({type: "createFragment", data: {name, bounds: map?.getBounds()}}))
            setError(false)
            setOpen(false)
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit()
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onKeyDown={onKeyDownHandler}>
            <DialogTitle>Создание фрагмента</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    value={name}
                    margin="dense"
                    id="name"
                    label="Название фрагмента"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    required={true}
                    onChange={handleChange}
                    error={error}
                />
                <p hidden={!error} style={{color: 'red', marginBottom: 0, textAlign: "center"}}>Имя фрагмента занято</p>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleSubmit}>Подтвердить</Button>
                <Button onClick={handleClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateFragmentDialog