import React from "react";
import {useAppSelector} from "../app/hooks";
import {
    selectTFLights
} from "../features/mapContainer/mapContentSlice";
import CustomAlert from "./CustomAlert";

function InputErrorAlerts() {
    const trafficLightsInputErrors = useAppSelector(selectTFLights).filter(tflight => tflight.inputError)
    
    return (
        <>
            {trafficLightsInputErrors.map((tflight, i) =>
                <CustomAlert open={true} tflight={tflight} num={i}/>
            )}
        </>
    )
}

export default InputErrorAlerts