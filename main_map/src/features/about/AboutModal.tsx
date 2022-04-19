import React, {useEffect, useState} from "react";
import {Link, Modal, Zoom} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectLicense} from "../mapContainer/acccountSlice";

function AboutModal(props: { handleClose?: Function, close?: boolean }) {
    const [open, setOpen] = useState(true);
    const license = useAppSelector(selectLicense)

    const handleClose = () => {
        setOpen(false);
        if (props.handleClose) setTimeout(props.handleClose, 1000)
    };

    useEffect(() => {
        if (props.close) setTimeout(() => setOpen(false), 3000)
    })

    return (
        <div>
            <Modal
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                // BackdropComponent={Backdrop}
                // BackdropProps={{timeout: 500}}
            >
                <Zoom in={open} style={{transitionDuration: "800ms", transitionTimingFunction: "ease"}}>
                    <div style={{
                        background: "transparent",
                        outline: "none",
                        userSelect: "none",
                        backgroundColor: "rgba(255, 255, 255, .15)",
                        backdropFilter: "blur(6px)",
                        borderRadius: "10px",
                        position: "relative",
                        textAlign: "center",
                        margin: "0 35vw",
                        width: "fit-content",
                        height: "fit-content",
                        wordWrap: "break-word",
                        padding: "15px",
                        lineHeight: "160%",
                    }}>
                        <p style={{marginTop: 0}}>АСУДД "Микро-М" <br/>
                            {(license !== "") && `Лицензия: ${license}`} <br/>
                            Версия: 1.00</p>
                        <p style={{margin: "5vh 1vw"}}>
                            Предназначена для упрощения процедур наблюдения,
                            управления и контроля за работой дорожных контроллеров и другого оборудования, работающего
                            в системе управления дорожным движением.</p>
                        <p>ООО "Автоматика-Д" <br/>
                            644042 г. Омск, пр. Карла Маркса, д.18, корпус 28 <br/>
                            тел./факс +7(3812)37-07-35, тел. +7(3812)39-49-10 <br/>
                            E-mail: p51@inbox.ru</p>
                        <Link href="http://asud55.ru/" target="_blank">http://asud55.ru/</Link>
                    </div>
                </Zoom>
            </Modal>
        </div>
    )
}

export default AboutModal