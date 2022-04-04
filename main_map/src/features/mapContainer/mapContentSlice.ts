import {MapContentState, MapInfoMsg, TflightMsg} from "../../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

const initialState: MapContentState = {
    regionInfo: {},
    areaInfo: {},
    areaZone: [],
    tflight: [],
}

export const mapContentSlice = createSlice({
    name: "mapContent",
    initialState,
    reducers: {
        setInitialData: (state, action: PayloadAction<MapInfoMsg>) => {
            state.regionInfo = action.payload.regionInfo
            state.areaInfo = action.payload.areaInfo
            state.areaZone = action.payload.areaZone
            state.tflight = action.payload.tflight
        },
        setTFLights: (state, action: PayloadAction<TflightMsg>) => {
            action.payload.tflight.forEach(updatedTfl => {
                const index = state.tflight.findIndex((oldTfl) =>
                    ((oldTfl.region === updatedTfl.region) && (oldTfl.area === updatedTfl.area) && (oldTfl.ID === updatedTfl.ID))
                )
                if (index === -1) {
                    state.tflight.push(updatedTfl)
                } else {
                    state.tflight.splice(index, 1, updatedTfl)
                }
            })
        }
    }
})

export const {setInitialData, setTFLights} = mapContentSlice.actions

export const selectTFLights = (state: RootState) => state.mapContent.tflight

export default mapContentSlice.reducer