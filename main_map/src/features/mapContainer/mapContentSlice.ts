import {
    CheckConnMsg,
    Circle, EditCrossUsersMsg, GetCamerasMsg,
    JumpMsg, LoginMsg,
    MapContentState,
    MapInfoMsg,
    RepaintMsg,
    TflightMsg
} from "../../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

const initialState: MapContentState = {
    regionInfo: {},
    areaInfo: {},
    areaZone: [],
    statusS: true,
    statusBD: true,
    multipleCrossSelect: false,
    camerasFlag: false,
    circles: [],
    boxPoint: {point0: {Y: 53, X: 44}, point1: {Y: 55, X: 46}},
    tflight: [],
    openedAlerts: 0,
    cameras: [],
    editCrossUser: []
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
        setAreaZone: (state, action: PayloadAction<LoginMsg>) => {
            state.areaZone = action.payload.areaZone
        },
        setRepaint: (state, action: PayloadAction<RepaintMsg>) => {
            state.areaZone = action.payload.areaZone
            state.tflight = action.payload.tflight
        },
        setStatus: (state, action: PayloadAction<CheckConnMsg>) => {
            if (action.payload.statusS !== undefined) state.statusS = action.payload.statusS
            if (action.payload.statusBD !== undefined) state.statusBD = action.payload.statusBD
        },
        switchMultipleCrossSelect: (state) => {
            state.multipleCrossSelect = !state.multipleCrossSelect
            if (!state.multipleCrossSelect) state.circles = []
        },
        setCamerasSelect: (state, action: PayloadAction<boolean>) => {
            state.camerasFlag = action.payload
        },
        addCircle: (state, action: PayloadAction<Circle>) => {
            if (state.circles.length < 6) state.circles.push(action.payload)
        },
        deleteCircle: (state, action: PayloadAction<Circle>) => {
            const index = state.circles.findIndex((circle) =>
                circle.coords.every((coord, index) => coord === action.payload.coords[index])
            )
            state.circles.splice(index, 1)
        },
        clearCircles: (state) => {
            state.circles = []
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
        },
        incrementAlertsNumber: (state) => {
            state.openedAlerts++
        },
        decrementAlertsNumber: (state) => {
            state.openedAlerts--
        },
        setCameras: (state, action: PayloadAction<GetCamerasMsg>) => {
            state.cameras = action.payload.cameras
        },
        setEditCrossUsers: (state, action: PayloadAction<EditCrossUsersMsg>) => {
            state.editCrossUser = action.payload.editCrossUsers
        },
    }
})

export const {
    setInitialData,
    setBoxPoint,
    setAreaZone,
    setRepaint,
    setStatus,
    switchMultipleCrossSelect,
    setCamerasSelect,
    addCircle,
    deleteCircle,
    clearCircles,
    setTFLights,
    incrementAlertsNumber,
    decrementAlertsNumber,
    setCameras,
    setEditCrossUsers,
} = mapContentSlice.actions

export const selectTFLights = (state: RootState) => state.mapContent.tflight
export const selectMultipleCrossSelect = (state: RootState) => state.mapContent.multipleCrossSelect
export const selectCircles = (state: RootState) => state.mapContent.circles
export const selectCirclesLength = (state: RootState) => state.mapContent.circles.length
export const selectAreaZone = (state: RootState) => state.mapContent.areaZone
export const selectAlertsNumber = (state: RootState) => state.mapContent.openedAlerts
export const selectCamerasFlag = (state: RootState) => state.mapContent.camerasFlag
export const selectCameras = (state: RootState) => state.mapContent.cameras
export const selectIsInEditing = (region: string, area: string, id: number) => (state: RootState) => {
    const edit = state.mapContent.editCrossUser.find(cross => (cross.pos.region === region) && (cross.pos.area === area) && cross.pos.id === id)
    if (edit) return [true, edit.login]
    return [false, ""]
}

export default mapContentSlice.reducer