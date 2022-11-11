import React, {useState} from "react";
import {useAppSelector} from "../app/hooks";
import {
    selectAlertsNumber,
    selectTFLights
} from "../features/mapContainer/mapContentSlice";
import CustomAlert from "./CustomAlert";
import {selectAuthorized} from "../features/mapContainer/acccountSlice";

function InputErrorAlerts() {
    const trafficLightsInputErrors = useAppSelector(selectTFLights).filter(tflight => tflight.inputError)
    const alertsNumber = useAppSelector(selectAlertsNumber)
    const logged = useAppSelector(selectAuthorized)

    const [closed, setClosed] = useState(0)
    const [closedIndex, setClosedIndex] = useState(0)
    const closeAlert = (q: number) => {
        setClosed(closed + 1)
        setClosedIndex(q)
    }

    return (
        <>
            {logged && trafficLightsInputErrors.map((tflight, i) =>
                <CustomAlert key={i} open={true} tflight={tflight} num={i} bottom={(i + 1 + alertsNumber - (closedIndex <= i ? closed : 0)) * 6} close={closeAlert}/>
            )}
        </>
    )
}

export default InputErrorAlerts