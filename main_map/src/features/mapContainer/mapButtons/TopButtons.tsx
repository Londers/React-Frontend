import React, {useState} from "react";
import {Button, YMapsApi} from "react-yandex-maps";
import {wsSendMessage} from "../../../common/Middlewares/WebSocketMiddleware";
import {useAppDispatch} from "../../../app/hooks";
import './TopButtons.sass'
import CreateFragmentDialog from "../../fragments/CreateFragmentDialog";
import MapManagementListBox from "./TopListBoxes/MapManagementListBox";
import ConnectionListBox from "./TopListBoxes/ConnectionListBox";
import MultipleCrossListBox from "./TopListBoxes/MultipleCrossListBox";
import HelpListBox from "./TopListBoxes/HelpListBox";
import AdministrationListBox from "./TopListBoxes/AdministrationListBox";
import SettingsListBox from "./TopListBoxes/SettingsListBox";

function TopButtons(props: { ymaps: YMapsApi | null, width: string }) {
    const [openCreateFragmentDialog, setOpenCreateFragmentDialog] = useState<boolean>(false)
    const [creatingFragment, setCreatingFragment] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        if (window.confirm("Вы уверены?")) dispatch(wsSendMessage({type: "logOut"}))
    }

    const startFragmentCreating = () => {
        setCreatingFragment(true)
    }

    const endFragmentCreating = () => {
        setCreatingFragment(false)
    }

    const createFragment = () => {
        setOpenCreateFragmentDialog(true)
    }

    const setOpenCreateFragmentDialogMiddleware = (open: boolean) => {
        endFragmentCreating()
        setOpenCreateFragmentDialog(open)
    }


    const noSelectItemLayout = props.ymaps?.templateLayoutFactory.createClass(
        "<div class='listbox__list-item listbox__list-item-text'>{{data.content}}</div>"
    )

    return (creatingFragment ?
            <>
                <Button
                    onClick={createFragment}
                    options={{
                        maxWidth: props.width,
                        selectOnClick: false,
                        float: "none",
                        position: {top: `.6rem`, left: "45vw"},
                        floatIndex: 4
                    }}
                    data={{content: "Создать"}}
                    defaultState={{selected: false}}
                />
                <Button
                    onClick={endFragmentCreating}
                    options={{
                        maxWidth: props.width,
                        selectOnClick: false,
                        float: "none",
                        position: {top: `.6rem`, left: "55vw"},
                        floatIndex: 3
                    }}
                    data={{content: "Назад"}}
                    defaultState={{selected: false}}
                />
                <CreateFragmentDialog open={openCreateFragmentDialog} setOpen={setOpenCreateFragmentDialogMiddleware}/>
            </>
            :
            <>
                <MapManagementListBox layout={noSelectItemLayout} />
                <ConnectionListBox />
                <MultipleCrossListBox />
                <Button
                    onClick={handleLogout}
                    options={{maxWidth: props.width, selectOnClick: false, float: "right", floatIndex: 3}}
                    data={{content: "Выход"}}
                    defaultState={{selected: false}}
                />
                <HelpListBox layout={noSelectItemLayout} />
                <AdministrationListBox layout={noSelectItemLayout} />
                <SettingsListBox layout={noSelectItemLayout} startFragmentCreating={startFragmentCreating} />
            </>

    )
}

export default TopButtons