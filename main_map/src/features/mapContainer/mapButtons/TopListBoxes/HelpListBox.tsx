import React from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";

function HelpListBox(props: {layout: any}) {
    return (
        <ListBox data={{content: "Помощь"}}
                 options={{float: "right", floatIndex: 2, itemLayout: props.layout}}>
            <ListBoxItem options={{selectOnClick: false}} data={{content: "Инструкция"}}/>
            <ListBoxItem options={{selectOnClick: false}} data={{content: "О производителе"}}/>
            <ListBoxItem options={{selectOnClick: false}} data={{content: "Техническая поддержка"}}/>
        </ListBox>
    )
}

export default HelpListBox