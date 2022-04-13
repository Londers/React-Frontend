import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import DeleteFragmentDialog from "../../../fragments/DeleteFragmentDialog";

function SettingsListBox(props: {layout: any, startFragmentCreating: Function}) {
    const [deletingFragment, setDeletingFragment] = useState<boolean>(false)

    const deleteFragment = () => {
        setDeletingFragment(true)
    }

    return (
        <>
            <ListBox data={{content: "Настройки"}}
                     options={{float: "right", floatIndex: 0, itemLayout: props.layout}}>
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