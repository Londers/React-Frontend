import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import AreaDialog from "../../../../common/AreaDialog";
import FragmentDialog from "../../../fragments/FragmentDialog";
import {wsSendMessage} from "../../../../common/Middlewares/WebSocketMiddleware";
import {useAppDispatch} from "../../../../app/hooks";

function MapManagementListBox(props: { layout: any }) {
    const [openAreaDialog, setOpenAreaDialog] = useState<boolean>(false)
    const [openFragmentsDialog, setOpenFragmentsDialog] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleJump = () => {
        setOpenAreaDialog(true)
    }

    const handleFragments = () => {
        setOpenFragmentsDialog(true)
    }

    const setOpenAreaMiddleware = (open: boolean, region: string, area: string[]) => {
        setOpenAreaDialog(open)
        if ((region === "") || (area.length === 0)) return
        dispatch(wsSendMessage({type: "jump", region, area}))
    }

    return (
        <>
            <ListBox data={{content: "Управление картой"}}
                     options={{floatIndex: 6, itemLayout: props.layout}}>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Перемещение"}} onClick={handleJump}/>
                <ListBoxItem options={{selectOnClick: false}} data={{content: "Фрагменты"}}
                             onClick={handleFragments}/>
                {/*<ListBoxItem options={{selectOnClick: false}} data={{content: "Зафиксировать экран"}}/>*/}
                {/*<ListBoxItem options={{selectOnClick: false}} data={{content: "Снять фиксацию"}}/>*/}
            </ListBox>
            <AreaDialog open={openAreaDialog} setOpen={setOpenAreaMiddleware} showAreas={true}/>
            <FragmentDialog open={openFragmentsDialog} setOpen={setOpenFragmentsDialog}/>
        </>
    )
}

export default MapManagementListBox