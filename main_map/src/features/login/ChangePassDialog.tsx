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
    OutlinedInput
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch} from "../../app/hooks";
import {handleChangePassword} from "../../common/Middlewares/CommonMiddleware";

function ChangePassDialog(props: {handleClose: Function}) {
    const [open, setOpen] = useState<boolean>(true)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    // const [oldPassFocus, setOldPassFocus] = useState<boolean>(true);
    const [blurred, setBlurred] = useState<boolean>(false)
    const [oldPass, setOldPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [repeatPass, setRepeatPass] = useState<string>("");

    const [compareError, setCompareError] = useState<boolean>(false)
    const [lengthError, setLengthError] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleKeyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit()
    }

    const handleOldPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPass(e.currentTarget.value)
    }

    const handleNewPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(e.currentTarget.value)
        setLengthError(e.currentTarget.value.length < 6)
    }

    const handleRepeatPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(e.currentTarget.value)
        setCompareError(newPass !== e.currentTarget.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleSubmit = () => {
        if (oldPass.length !== 0 && !lengthError && !compareError) {
            setOpen(false)
            props.handleClose()
            dispatch(handleChangePassword({newPW: newPass, oldPW: oldPass}))
        }
    }

    const handleClose = () => {
        setOpen(false)
        props.handleClose()
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} onKeyDown={handleKeyDownHandler}>
                <DialogTitle>Смена пароля</DialogTitle>
                <DialogContent>
                    <form style={{display: "grid"}}>
                        <FormControl sx={{marginTop: "2vh"}} variant="outlined" color="secondary" required={true}>
                            <InputLabel htmlFor="outlined-adornment-password">Текущий пароль</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                autoComplete="current-password"
                                autoFocus={true}
                                type={showPassword ? "text" : "password"}
                                value={oldPass}
                                onChange={handleOldPassChange}
                                onBlur={() => setBlurred(true)}
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
                                label="Текущий пароль"
                            />
                        </FormControl>
                        <FormControl sx={{marginTop: "2vh"}} variant="outlined" color="secondary" required={true}>
                            <InputLabel htmlFor="outlined-adornment-new-password">Новый пароль</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-new-password"
                                autoComplete="new-password"
                                type={showPassword ? "text" : "password"}
                                value={newPass}
                                onChange={handleNewPassChange}
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
                                label="Новый пароль"
                            />
                        </FormControl>
                        <FormControl sx={{marginTop: "2vh"}} variant="outlined" color="secondary" required={true}>
                            <InputLabel htmlFor="outlined-adornment-repeat-password">Повторите новый пароль</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-repeat-password"
                                autoComplete="new-password"
                                type={showPassword ? "text" : "password"}
                                value={repeatPass}
                                onChange={handleRepeatPassChange}
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
                                label="Повторите новый пароль"
                            />
                        </FormControl>
                        {/*<p hidden={!status} style={{color: "red"}}>{message ?? ""}</p>*/}
                        {((oldPass.length === 0) && blurred) ?
                            <p style={{color: "red"}}>Введите текущий пароль</p> :
                            (lengthError ?
                                    <p style={{color: "red"}}>Слишком короткий пароль</p> :
                                    compareError &&
                                        <p style={{color: "red"}}>Пароли не совпадают</p>
                            )
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={handleSubmit}>Подтвердить</Button>
                    <Button onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ChangePassDialog