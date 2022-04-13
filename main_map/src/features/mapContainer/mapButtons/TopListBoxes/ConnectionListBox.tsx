import React from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import {useAppSelector} from "../../../../app/hooks";

function ConnectionListBox() {
    const statusS = useAppSelector(state => state.mapContent.statusS)
    const statusBD = useAppSelector(state => state.mapContent.statusBD)

    return (
        <ListBox data={{content: "Связь"}} options={{floatIndex: 5}}>
            <ListBoxItem options={{selectOnClick: false}} state={{selected: statusBD}}
                         data={{content: "Состояние связи с базой"}}/>
            <ListBoxItem options={{selectOnClick: false}} state={{selected: statusS}}
                         data={{content: "Состояние связи с сервером"}}/>
        </ListBox>
    )
}

export default ConnectionListBox