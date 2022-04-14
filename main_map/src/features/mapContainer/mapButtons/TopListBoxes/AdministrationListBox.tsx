import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import {openTab} from "../SideButtons";
import LoginDialog from "../../../login/LoginDialog";
import ChangePassDialog from "../../../login/ChangePassDialog";

function AdministrationListBox(props: { width: string, layout: any }) {
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false)
    const [showChangePassDialog, setShowChangePassDialog] = useState<boolean>(false)

    const handleChangeAccClick = () => {
        setShowLoginDialog(!showLoginDialog)
    }

    const handleChangePass = () => {
        setShowChangePassDialog(!showChangePassDialog)
    }

    const handleManageClick = () => {
        openTab("/manage")
    }

    return (
        <>
            <ListBox data={{content: "Администрирование"}}
                     options={{float: "right", floatIndex: 1, itemLayout: props.layout}}>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Сменить пользователя"}}
                             onClick={handleChangeAccClick}
                />
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Сменить пароль"}}
                             onClick={handleChangePass}
                />
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Таблица данных операторов"}}
                             onClick={handleManageClick}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Просмотр лицензии"}}/>
            </ListBox>
            {showLoginDialog && <LoginDialog width={props.width} change={true}/>}
            {showChangePassDialog && <ChangePassDialog/>}
        </>
    )
}

export default AdministrationListBox