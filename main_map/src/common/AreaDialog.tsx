import React, {useState} from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {selectAvailableAreas, selectAvailableRegions} from "../features/mapContainer/acccountSlice";
import {Area} from "./index";

function AreaDialog(props: { open: boolean, setOpen: Function }) {
    const [open, setOpen] = [props.open, props.setOpen]

    const handleSubmit = () => setOpen(false)
    const handleClose = () => setOpen(false)

    const regions = useAppSelector(selectAvailableRegions)
    const areas = useAppSelector(selectAvailableAreas)
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }


    const [regionNum, setRegionNum] = useState('');
    const [area, setArea] = useState<Area>({})

    const handleRegionChange = (event: SelectChangeEvent) => {
        setRegionNum(event.target.value)
        const [rnum, rname]: [string, string] = regions.find(([regNum, regName]) => regNum === event.target.value) ?? ['', '']
        const area = areas.find(([regname, areas]) => regname === rname) ?? ['', {}]
        setArea(area[1])
        setPersonName([])
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Выбор района</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{marginTop: "2vh"}}>
                    <InputLabel id="demo-simple-select-label">Регион</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={regionNum}
                        label="Регион"
                        onChange={handleRegionChange}
                    >
                        {
                            regions?.map(([regionNum, regionName]) =>
                               <MenuItem value={regionNum} key={regionNum}>{regionName}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{marginTop: "2vh"}}>
                    <InputLabel id="demo-multiple-chip-label">Район</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip-select"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Район"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value}/>
                                ))}
                            </Box>
                        )}
                    >
                        {Object.entries(area).map(([name, value]) => (
                            <MenuItem
                                key={name}
                                value={value}
                            >
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleSubmit}>Подтвердить</Button>
                <Button onClick={handleClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AreaDialog