import React, {useState} from "react";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import axios, {AxiosResponse} from "axios";

function TechSuppDialog(props: {handleClose: Function}) {
    const [open, setOpen] = useState<boolean>(true)
    const [text, setText] = useState<string>("")

    const handleSubmit = () => {
        axios.post(
            "https://192.168.115.134:4443/user/Admin/techSupp/send",
            JSON.stringify({text}))
            .then((response: AxiosResponse<any>) => {
            console.log(response.data)
        })
        setOpen(false)
        props.handleClose()
    }

    const handleClose = () => {
        setOpen(false)
        props.handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Техническая поддержка</DialogTitle>
            <DialogContent style={{width: "30vw"}} >
                <TextField fullWidth multiline={true} rows={10} onChange={(event) => {
                    setText(event.target.value)
                }}/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleSubmit}>Подтвердить</Button>
                <Button onClick={handleClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TechSuppDialog;