import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Button as YButton} from "react-yandex-maps";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectAuthorized} from "../features/mapContainer/acccountSlice";
import {wsSendMessage} from "./Middleware";

function LoginModal(props: { width: string }) {
    const authorized = useAppSelector(selectAuthorized)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        dispatch(wsSendMessage({type: "login", login, password}))
        // console.log(login, password)
        handleClose()
    }

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.currentTarget.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <>
            {!authorized &&
                <YButton
                options={{maxWidth: props.width, selectOnClick: false, float: "right", floatIndex: 3}}
                data={{content: "Вход"}}
                defaultState={{selected: false}}
                onClick={handleOpen}/>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Авторизация</DialogTitle>
                <DialogContent sx={{display: "grid"}}>
                    <TextField
                        autoFocus
                        value={login}
                        margin="dense"
                        id="name"
                        label="Логин"
                        type="login"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        onChange={handleLoginChange}
                    />
                    <FormControl sx={{marginTop: '1vh'}} variant="outlined" color="secondary">
                        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Пароль"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={handleSubmit}>Подтвердить</Button>
                    <Button onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoginModal