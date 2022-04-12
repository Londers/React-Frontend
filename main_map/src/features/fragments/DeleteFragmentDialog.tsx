import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectFragments} from "../mapContainer/acccountSlice";
import {wsSendMessage} from "../../common/Middleware";

function DeleteFragmentDialog(props: { open: boolean, setOpen: Function }) {
    const [open, setOpen] = [props.open, props.setOpen]
    const fragments = useAppSelector(selectFragments)
    const [selected, setSelected] = useState<string | undefined>(fragments[0]?.name)

    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        if (selected) {
            dispatch(wsSendMessage({type: "deleteFragment", data: {name: selected}}))
            setOpen(false)
        }
    }

    const handleChange = (e: SelectChangeEvent) => {
        setSelected(e.target.value)
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Удаление фрагмента</DialogTitle>
            <DialogContent>
                {(fragments.length === 0) ? "Фрагменты отсутствуют" :
                    <FormControl sx={{marginTop: "2vh", marginRight: "1vw", width: "250px"}}>
                        <InputLabel id="demo-simple-select-label">Фрагмент</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={fragments[0].name}
                            label="Регион"
                            onChange={handleChange}
                        >
                            {
                                fragments?.map(fragment =>
                                    <MenuItem value={fragment.name} key={fragment.name}>{fragment.name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                }
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleSubmit}>Подтвердить</Button>
                <Button onClick={handleClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteFragmentDialog