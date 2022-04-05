import React from "react";
import {Button, YMapsApi} from "react-yandex-maps";
import './SideButtons.sass'

const buttonsNames = ["Сервер связи", "Журнал клиентов", "Журнал системы", "ДУ", "Стандартные ЗУ", "Произвольные ЗУ",
    "Управление по хар. точкам", "Предупреждения"]
const indent = 25

function SideButtons(props: { ymaps: YMapsApi | null, width: string }) {
    return (
        props.ymaps &&
        <React.Fragment>
            {
                buttonsNames.map((name, index) => (
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
                            onClick={() => {
                                console.log(`${name} was clicked`)
                            }}
                        />
                    )
                )
            }
        </React.Fragment>
    )
}

export default SideButtons;