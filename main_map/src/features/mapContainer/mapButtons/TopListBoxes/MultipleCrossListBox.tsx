import React, {useState} from "react";
import {ListBox, ListBoxItem} from "react-yandex-maps";
import {clearCircles, selectCircles, selectMultipleCrossSelect, switchMultipleCrossSelect} from "../../mapContentSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {openTab} from "../SideButtons";

function MultipleCrossListBox() {
    const [expanded, setExpanded] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const multipleCrossSelect = useAppSelector(selectMultipleCrossSelect)
    const circles = useAppSelector(selectCircles)

    const handleMultipleCrossClick = () => {
        dispatch(switchMultipleCrossSelect())
        setExpanded(false)
    }

    const handleOpenMultipleCrossClick = () => {
        if (circles.length !== 0) {
            localStorage.setItem("multipleCross", JSON.stringify(circles.map(circle => circle.position)))
            dispatch(switchMultipleCrossSelect())
            openTab("/multipleCross")
        }
    }

    const handleCirclesClearClick = () => {
        if (circles.length > 0) dispatch(clearCircles())
    }

    return (
        <ListBox data={{content: "Просмотр перекрёстков"}}
                 options={{floatIndex: 4}}
                 state={{expanded}}>
            <ListBoxItem options={{selectOnClick: false}}
                         state={{selected: multipleCrossSelect}}
                         data={{content: "Активировать выбор перекрёстков"}}
                         onClick={handleMultipleCrossClick}/>
            <ListBoxItem options={{selectOnClick: false}}
                         state={{enabled: circles.length !== 0}}
                         data={{content: "Открыть просмотр"}}
                         onClick={handleOpenMultipleCrossClick}/>
            <ListBoxItem options={{selectOnClick: false}}
                         state={{enabled: circles.length > 0}}
                         data={{content: "Очистить список перекрёстков"}}
                         onClick={handleCirclesClearClick}/>
        </ListBox>
    )
}

export default MultipleCrossListBox