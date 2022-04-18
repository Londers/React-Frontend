import React from "react";
import {Link, Modal, Zoom} from "@mui/material";

function AboutModal(props: { handleClose: Function }) {
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.handleClose()
    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                open modal
            </button>
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
                <Zoom in={open} style={{transitionDuration: "600ms", transitionTimingFunction: "ease"}}>
                    <div style={{
                        background: "transparent",
                        outline: "none",
                        userSelect: "none",
                        backgroundColor: "rgba(255, 255, 255, .15)",
                        backdropFilter: "blur(6px)",
                        borderRadius: "10px",
                        position: "relative",
                        textAlign: "center",
                        minWidth: "30vw",
                        // width: "fit-content",
                        height: "fit-content",
                        wordWrap: "break-word",
                        padding: "15px",
                        lineHeight: "160%",
                    }}>
                        <p style={{marginTop: 0}}>АСУДД "Микро-М" <br/>
                        Лицензия: S001D5000A5000 <br/>
                        Версия: 1.00</p>
                        <p style={{margin: "5vh 0", width: "30vw",}}>
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