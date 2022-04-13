import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {Tflight} from "../index";
import {RootState} from "../../app/store";
import {addCircle, deleteCircle} from "../../features/mapContainer/mapContentSlice";

export const handleTFLightClick = createAction<Tflight>("trafficLights/click")
export const TrafficLightsMiddleware = createListenerMiddleware()

TrafficLightsMiddleware.startListening({
    matcher: isAnyOf(handleTFLightClick),
    effect: async (action, listenerApi) => {
        if (handleTFLightClick.match(action)) {
            const state = listenerApi.getState() as RootState
            if (state.account.authorizedFlag) {
                if (state.mapContent.multipleCrossSelect) {
                    const coords = [action.payload.points.Y, action.payload.points.X]
                    const position = {region: action.payload.region.num, area: action.payload.area.num, id: action.payload.ID}
                    if (state.mapContent.circles.some(circle => circle.coords.every((coord, index) => coord === coords[index]))) {
                        listenerApi.dispatch(deleteCircle({coords, position}))
                    } else {
                        listenerApi.dispatch(addCircle({coords, position}))
                    }
                } else {
                    console.log("cross")
                }
            }
        }
    },
})