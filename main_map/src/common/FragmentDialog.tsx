import React, {useContext, useEffect, useState} from "react";
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
import {useAppSelector} from "../app/hooks";
import {selectFragments} from "../features/mapContainer/acccountSlice";
import {MapContext} from "../features/mapContainer/MapContainer";

function FragmentDialog(props: { open: boolean, setOpen: Function }) {
    const [open, setOpen] = [props.open, props.setOpen]
    const fragments = useAppSelector(selectFragments)
    const [selectedBounds, setSelectedBounds] = useState<number[][] | undefined>(fragments[0]?.bounds)

    const map = useContext(MapContext)

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        if (selectedBounds && map) map?.setBounds(selectedBounds)
        setOpen(false)
    }

    const handleChange = (e: SelectChangeEvent) => {
        setSelectedBounds(fragments.find(fragment => fragment.name === e.target.value)?.bounds)
    }

    useEffect(() => {
        setSelectedBounds(fragments[0]?.bounds)
    }, [fragments, open])

    return (
        <Dialog open={open}>
            <DialogTitle>Выбор фрагмента</DialogTitle>
            <DialogContent>
                {(fragments.length === 0) ? "Фрагменты отсутствуют" :
                    <FormControl sx={{marginTop: "2vh", marginRight: "1vw", width: "250px"}}>
                        <InputLabel id="demo-simple-select-label">Регион</InputLabel>
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

export default FragmentDialog