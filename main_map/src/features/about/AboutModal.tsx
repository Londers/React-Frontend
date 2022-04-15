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
                        backgroundColor: "#33A8BB",
                        border: "2px solid black",
                        borderRadius: "10px",
                        textAlign: "center",
                    }}>
                        <p>АСУДД "Микро-М"</p>
                        <p>Лицензия: S001D5000A5000</p>
                        <p>Версия: 1.00</p>
                        <p>Предназначена для упрощения процедур наблюдения, управления и контроля за работой
                            дорожных</p>
                        <p>контроллеров и другого оборудования, работающего в системе управления дорожным движением.</p>
                        <p>ООО "Автоматика-Д"</p>
                        <p>644042 г. Омск, пр. Карла Маркса, д.18, корпус 28</p>
                        <p>тел./факс +7(3812)37-07-35, тел. +7(3812)39-49-10</p>
                        <p>E-mail: p51@inbox.ru</p>
                        <Link href="http://asud55.ru/" target="_blank">http://asud55.ru/</Link>
                    </div>
                </Zoom>
            </Modal>
        </div>
    )
}

export default AboutModal