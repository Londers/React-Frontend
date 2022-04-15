import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import {openTab} from "../SideButtons";
import AboutModal from "../../../about/AboutModal";

function HelpListBox(props: { layout: any }) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [showAboutModal, setShowAboutModal] = useState<boolean>(false)

    const handleAboutModalClick = () => {
        setShowAboutModal(true)
    }

    const handleTechSuppClick = () => {
        openTab("/techSupp")
        setExpanded(false)
    }

    return (
        <>
            <ListBox data={{content: "Помощь"}}
                     options={{float: "right", floatIndex: 2, itemLayout: props.layout}}
                     state={{expanded}}>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Инструкция"}}/>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "О производителе"}}
                             onClick={handleAboutModalClick}/>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Техническая поддержка"}}
                             onClick={handleTechSuppClick}/>
            </ListBox>
            {showAboutModal && <AboutModal handleClose={() => setShowAboutModal(false)}/>}
        </>
    )
}

export default HelpListBox