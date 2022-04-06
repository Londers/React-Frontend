import React, {useState} from "react";
import {Button, YMapsApi} from "react-yandex-maps";
import './SideButtons.sass'
import AreaDialog from "../../../common/AreaDialog";

const indent = 25

function SideButtons(props: { ymaps: YMapsApi | null, width: string }) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const techArmButton = () => setOpenModal(true)
    const openTab = (path: string) => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            window.open("/user/" + localStorage.getItem("login") + path)
        } else {
            window.open(window.location.origin + "/user/" + localStorage.getItem("login") + path)
        }
    }
    const alarmButton = () => setOpenModal(true)

    const buttonsNames = [
        ["Сервер связи", techArmButton],
        ["Журнал клиентов", () => openTab("/deviceLog")],
        ["Журнал системы", () => openTab("/manage/serverLog")],
        ["ДУ", () => openTab("/dispatchControl")],
        ["Стандартные ЗУ", () => openTab("/greenStreet")],
        ["Произвольные ЗУ", () => openTab("/arbitraryGS")],
        ["Управление по хар. точкам", () => openTab("/charPoints")],
        ["Предупреждения", alarmButton],
    ]

    return (
        props.ymaps &&
        <>
            {
                buttonsNames.map(([name, handler], index) => (
                        <Button
                            key={index}
                            options={{
                                maxWidth: props.width,
                                selectOnClick: false,
                                float: "none",
                                position: {bottom: `${indent - (index * 2.5)}rem`, left: ".5rem"},
                                layout: props.ymaps?.templateLayoutFactory.createClass(
                                    `<div class="ymaps-float-button ymaps-hidden-icon">
                                        <span class="ymaps-button-text">{{ data.content }}</span> 
                                    </div>`
                                ),
                                // adjustMapMargin: true
                            }}
                            data={{content: name}}
                            defaultState={{selected: false}}
                            onClick={handler}
                        />
                    )
                )
            }
            <AreaDialog open={openModal} setOpen={setOpenModal}/>
        </>
    )
}

export default SideButtons;