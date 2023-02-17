import React, {ChangeEvent, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import PasswordDialog from "../../common/PasswordDialog";
import {PassRequest} from "../../common";

function ExchangeDialog(props: { handleClose: Function }) {
    const [open, setOpen] = useState<boolean>(true)
    const [openPass, setOpenPass] = useState<boolean>(false)
    const [createLogin, setCreateLogin] = useState<string>("")
    const [deleteLogin, setDeleteLogin] = useState<string>("")
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleCreateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCreateLogin(e.currentTarget.value)
    }
    const handleDeleteChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDeleteLogin(e.currentTarget.value)
    }

    const handleClose = () => {
        setOpen(false)
        props.handleClose()
    }

    const handleCreate = () => {
        axios.post(`${window.location.origin}/user/TechAutomatic/exchange/add`, {login: createLogin})
            .then((response: AxiosResponse<PassRequest>) => {
                setLogin(response.data.login)
                setPassword(response.data.pass)
                setOpenPass(true)
            })
            .finally(() => setCreateLogin(""))
    }
    const handleDelete = () => {
        axios.post(`${window.location.origin}/user/TechAutomatic/exchange/delete`, {login: deleteLogin})
            .then((response: AxiosResponse<PassRequest>) => {
                alert('Аккаунт успешно удалён')
            })
            .finally(() => setDeleteLogin(""))
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Аккаунты exchange</DialogTitle>
            <DialogContent sx={{textAlign: "center"}}>
                <div style={{display: "grid"}}>
                    <TextField
                        sx={{marginTop: "2vh"}}
                        value={createLogin}
                        margin="dense"
                        id="create"
                        label="Логин"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        required={false}
                        onChange={handleCreateChange}
                    />
                    <Button variant="outlined" onClick={handleCreate}>Создать пользователя exchange</Button>
                </div>
                <div style={{display: "grid"}}>
                    <TextField
                        sx={{marginTop: "2vh"}}
                        value={deleteLogin}
                        margin="dense"
                        id="delete"
                        label="Логин"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        required={false}
                        onChange={handleDeleteChange}
                    />
                    <Button variant="outlined" onClick={handleDelete}>Удалить пользователя exchange</Button>
                </div>
                <PasswordDialog open={openPass} setOpen={setOpenPass} login={login} password={password}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ExchangeDialog;