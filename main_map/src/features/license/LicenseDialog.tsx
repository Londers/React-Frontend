import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField,
    Typography
} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {GetLicenseRequest} from "../../common";

function LicenseDialog(props: { handleClose: Function }) {
    const [open, setOpen] = useState<boolean>(true)
    const [newLicense, setNewLicense] = useState<string>("")
    const [licenseInfo, setLicenseInfo] = useState<GetLicenseRequest>({
        address: "",
        license: "",
        message: "",
        name: "",
        numAcc: 0,
        numDev: 0,
        phone: "",
        timeEnd: "",
    })

    useEffect(() => {
        axios.post(window.location.origin + '/user/' + localStorage.getItem('login') + '/license')
            .then((response: AxiosResponse<GetLicenseRequest>) => {
                setLicenseInfo(response.data)
            })
            .catch((error) => {
                window.alert(error.message)
            })
    }, [])

    const formatTime = (time: string) => new Date(time).toLocaleString('ru-RU', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewLicense(e.currentTarget.value)
    }

    const handleSubmit = () => {
        axios.post(window.location.origin + '/user/' + localStorage.getItem('login') + '/license/newToken',
            {keyStr: newLicense})
            .then((response: AxiosResponse<GetLicenseRequest>) => {
                props.handleClose()
            })
            .catch((error) => {
                window.alert(error.response.data.message)
            })
        setOpen(false)
        props.handleClose()
    }

    const handleClose = () => {
        setOpen(false)
        props.handleClose()
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Информация о лицензии</DialogTitle>
            <DialogContent sx={{textAlign: "center"}}>
                <Typography>Организация: {licenseInfo.name}</Typography>
                <Typography>Адрес: {licenseInfo.address}</Typography>
                <Typography>Количество доступных аккаунтов: {licenseInfo.numAcc}</Typography>
                <Typography>Количество доступных устройтв: {licenseInfo.numDev}</Typography>
                <Typography>Время окончания срока действия лицензии: {formatTime(licenseInfo.timeEnd)}</Typography>
                <TextField
                    sx={{marginTop: "2vh"}}
                    value={newLicense}
                    margin="dense"
                    id="name"
                    label="Новая лицензия"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    required={false}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleSubmit}>Внести новую лицензию</Button>
                <Button onClick={handleClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LicenseDialog