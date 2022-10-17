import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {SendChangePasswordMsg, Tflight} from "../index";
import {RootState} from "../../app/store";
import {addCircle, deleteCircle} from "../../features/mapContainer/mapContentSlice";
import axios from "axios";
import {openTab} from "../../features/mapContainer/mapButtons/SideButtons";

export const handleTFLightClick = createAction<Tflight>("trafficLights/click")
export const handleChangePassword = createAction<SendChangePasswordMsg>("fetch/changePassword")
export const CommonMiddleware = createListenerMiddleware()

CommonMiddleware.startListening({
    matcher: isAnyOf(handleTFLightClick, handleChangePassword),
    effect: async (action, listenerApi) => {
        if (handleTFLightClick.match(action)) {
            const state = listenerApi.getState() as RootState
            if (state.account.authorizedFlag) {
                if (state.mapContent.multipleCrossSelect) {
                    const coords = [action.payload.points.Y, action.payload.points.X]
                    const position = {region: action.payload.region.num, area: action.payload.area.num, id: action.payload.id}
                    if (state.mapContent.circles.some(circle => circle.coords.every((coord, index) => coord === coords[index]))) {
                        listenerApi.dispatch(deleteCircle({coords, position}))
                    } else {
                        listenerApi.dispatch(addCircle({coords, position}))
                    }
                } else {
                    const searchStr = 'Region=' + action.payload.region.num + '&Area=' + action.payload.area.num + '&ID=' + action.payload.id
                    openTab("/cross?" + searchStr)
                }
            }
        } else if (handleChangePassword.match(action)) {
            const state = listenerApi.getState() as RootState
            axios.post(
                `${window.location.origin}/user/${state.account.login}/manage/changepw`,
                action.payload,
            ).then((response) => {
                window.alert("Пароль успешно изменён. Пожалуйста, войдите в аккаунт снова.")
                console.log("success", response)
            }).catch((error) => {
                window.alert(error.message)
            })
        }
    },
})