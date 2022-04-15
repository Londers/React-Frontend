import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import {openTab} from "../SideButtons";
import LoginDialog from "../../../login/LoginDialog";
import ChangePassDialog from "../../../login/ChangePassDialog";
import LicenseDialog from "../../../license/LicenseDialog";

function AdministrationListBox(props: { width: string, layout: any }) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false)
    const [showChangePassDialog, setShowChangePassDialog] = useState<boolean>(false)
    const [showLicenseDialog, setShowLicenseDialog] = useState<boolean>(false)

    const handleChangeAccClick = () => {
        setShowLoginDialog(!showLoginDialog)
        setExpanded(false)
    }

    const handleChangePassClick = () => {
        setShowChangePassDialog(!showChangePassDialog)
        setExpanded(false)
    }

    const handleLicenseClick = () => {
        setShowLicenseDialog(!showChangePassDialog)
        setExpanded(false)
    }

    const handleManageClick = () => {
        openTab("/manage")
        setExpanded(false)
    }

    return (
        <>
            <ListBox data={{content: "Администрирование"}}
                     options={{float: "right", floatIndex: 1, itemLayout: props.layout}}
                     state={{expanded}}>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Сменить пользователя"}}
                             onClick={handleChangeAccClick}
                />
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Сменить пароль"}}
                             onClick={handleChangePassClick}
                />
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Таблица данных операторов"}}
                             onClick={handleManageClick}/>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Просмотр лицензии"}}
                             onClick={handleLicenseClick}/>
            </ListBox>
            {showLoginDialog && <LoginDialog width={props.width} change={true}/>}
            {showChangePassDialog && <ChangePassDialog handleClose={() => setShowChangePassDialog(false)}/>}
            {showLicenseDialog && <LicenseDialog handleClose={() => setShowLicenseDialog(false)}/>}
        </>
    )
}

export default AdministrationListBox