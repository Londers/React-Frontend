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

function AreaDialog(props: { open: boolean, setOpen: Function, showAreas: boolean }) {
    const [open, setOpen] = [props.open, props.setOpen]

    const handleSubmit = () => {
        // props.setSelectedRegion(regionNum)
        const selectedAreaNums = []
        for (const [areaNum, areaName] of Object.entries(area)) {
            if (selectedAreas.some(area => area === areaName)) selectedAreaNums.push(areaNum)
        }
        // props.setSelectedAreas(selectedAreaNums)
        setOpen(false, regionNum, selectedAreaNums)
        setSelectedAreas([])
    }
    const handleClose = () => {
        setOpen(false, "", [])
        setSelectedAreas([])
    }

    const userRegion = useAppSelector(selectAvailableRegions)
    const userAreas = useAppSelector(selectAvailableAreas)

    const getArea = (regionNumber: string) => {
        const [, regionName]: [string, string] = userRegion.find(([userRegionNumber]) => userRegionNumber === regionNumber) ?? ['', '']
        return (userAreas.find(([userRegionName]) => userRegionName === regionName) ?? ['', {}])[1]
    }

    const [regionNum, setRegionNum] = useState(userRegion.length === 0 ? "-1" : userRegion[0][0]);
    const [area, setArea] = useState<Area>(getArea(regionNum))
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    const handleRegionChange = (event: SelectChangeEvent) => {
        setRegionNum(event.target.value)
        setArea(getArea(event.target.value))
        setSelectedAreas([])
    }

    const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
        const value = event.target.value
        setSelectedAreas(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Выбор {props.showAreas ? "района" : "региона"}</DialogTitle>
            <DialogContent>
                <FormControl sx={{marginTop: "2vh", marginRight: "1vw", width: "250px"}}>
                    <InputLabel id="demo-simple-select-label">Регион</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={regionNum}
                        label="Регион"
                        disabled={userRegion.length === 1}
                        onChange={handleRegionChange}
                    >
                        {
                            userRegion?.map(([regionNum, regionName]) =>
                                <MenuItem value={regionNum} key={regionNum}>{regionName}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                {props.showAreas &&
                    <FormControl sx={{marginTop: "2vh", width: "250px"}}>
                        <InputLabel id="demo-multiple-chip-label">Район</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip-select"
                            multiple
                            value={selectedAreas}
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
                            {
                                Object.entries(area).map(([name, value]) => (
                                    <MenuItem key={name} value={value}>{value}</MenuItem>
                                ))
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

export default AreaDialog