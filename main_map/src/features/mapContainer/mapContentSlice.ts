import {CheckConnMsg, JumpMsg, MapContentState, MapInfoMsg, RepaintMsg, TflightMsg} from "../../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

const initialState: MapContentState = {
    regionInfo: {},
    areaInfo: {},
    areaZone: [],
    statusS: true,
    statusBD: true,
    boxPoint: {point0: {Y: 53, X: 44}, point1: {Y: 55, X: 46}},
    tflight: []
}

export const mapContentSlice = createSlice({
    name: "mapContent",
    initialState,
    reducers: {
        setInitialData: (state, action: PayloadAction<MapInfoMsg>) => {
            state.regionInfo = action.payload.regionInfo
            state.areaInfo = action.payload.areaInfo
            state.areaZone = action.payload.areaZone
            state.boxPoint = action.payload.boxPoint
            state.tflight = action.payload.tflight
        },
        setBoxPoint: (state, action: PayloadAction<JumpMsg>) => {
            state.boxPoint = action.payload.boxPoint
        },
        setRepaint: (state, action: PayloadAction<RepaintMsg>) => {
            state.areaZone = action.payload.areaZone
            state.tflight = action.payload.tflight
        },
        setStatus: (state, action: PayloadAction<CheckConnMsg>) => {
            if (action.payload.statusS !== undefined) state.statusS = action.payload.statusS
            if (action.payload.statusBD !== undefined) state.statusBD = action.payload.statusBD
        },
        setTFLights: (state, action: PayloadAction<TflightMsg>) => {
            action.payload.tflight.forEach(updatedTfl => {
                const index = state.tflight.findIndex((oldTfl) =>
                    ((oldTfl.region.num === updatedTfl.region.num) && (oldTfl.area.num === updatedTfl.area.num) && (oldTfl.ID === updatedTfl.ID))
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

export const {setInitialData, setBoxPoint, setRepaint, setStatus, setTFLights} = mapContentSlice.actions

export const selectTFLights = (state: RootState) => state.mapContent.tflight

export default mapContentSlice.reducer