import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import {openTab} from "../SideButtons";
import AboutModal from "../../../about/AboutModal";
import axios from "axios";
import TechSuppDialog from "../../../techSupp/TechSuppDialog";

function HelpListBox(props: { layout: any }) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [showAboutModal, setShowAboutModal] = useState<boolean>(false)
    const [showTechSuppDialog, setShowTechSuppDialog] = useState<boolean>(false)

    const handleAboutModalClick = () => {
        setShowAboutModal(true)
    }

    const handleTechSuppClick = () => {
        setShowTechSuppDialog(true)
        // openTab("/techSupp")
        setExpanded(false)
    }

    const hadnleInstructionClick = () => {
        window.open("/free/resources/АСУДД Микро-М_АРМ_2022.pdf", '_blank')
        setExpanded(false)
    }

    return (
        <>
            <ListBox data={{content: "Помощь"}}
                     options={{float: "right", floatIndex: 2, itemLayout: props.layout}}
                     state={{expanded}}>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Инструкция"}}
                             onClick={hadnleInstructionClick}/>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "О производителе"}}
                             onClick={handleAboutModalClick}/>
                <ListBoxItem options={{selectOnClick: false}}
                             data={{content: "Техническая поддержка"}}
                             onClick={handleTechSuppClick}/>
            </ListBox>
            {showAboutModal && <AboutModal handleClose={() => setShowAboutModal(false)}/>}
            {showTechSuppDialog && <TechSuppDialog handleClose={() => setShowTechSuppDialog(false)}/>}
        </>
    )
}

export default HelpListBox