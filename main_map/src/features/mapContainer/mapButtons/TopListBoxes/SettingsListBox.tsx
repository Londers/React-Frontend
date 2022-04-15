import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import DeleteFragmentDialog from "../../../fragments/DeleteFragmentDialog";

function SettingsListBox(props: {layout: any, startFragmentCreating: Function}) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [deletingFragment, setDeletingFragment] = useState<boolean>(false)

    const deleteFragment = () => {
        setDeletingFragment(true)
        setExpanded(false)
    }

    return (
        <>
            <ListBox data={{content: "Настройки"}}
                     options={{float: "right", floatIndex: 0, itemLayout: props.layout}}
                     state={{expanded}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Создание фрагментов"}}
                             onClick={props.startFragmentCreating}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Удаление фрагментов"}}
                             onClick={deleteFragment}/>
            </ListBox>
            <DeleteFragmentDialog open={deletingFragment} setOpen={setDeletingFragment}/>
        </>
    )
}

export default SettingsListBox