import React from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";

function AdministrationListBox(props: { layout: any }) {
    return (
        <ListBox data={{content: "Администрирование"}}
                 options={{float: "right", floatIndex: 1, itemLayout: props.layout}}>
            <ListBoxItem options={{selectOnClick: false}} data={{content: "Сменить пользователя"}}/>
            <ListBoxItem options={{selectOnClick: false}} data={{content: "Сменить пароль"}}/>
            <ListBoxItem options={{selectOnClick: false}} data={{content: "Таблица данных операторов"}}/>
            <ListBoxItem options={{selectOnClick: false}} data={{content: "Просмотр лицензии"}}/>
        </ListBox>
    )
}

export default AdministrationListBox