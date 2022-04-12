import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {
    LoginMsg,
    LogoutMsg,
    MapInfoMsg,
    TflightMsg,
    IncomingWebSocketMessage,
    OutcomingWebSocketMessage, JumpMsg, RepaintMsg, ChangeFragmentsMsg, CheckConnMsg
} from "./index";
import {fillAccountData, setLogouted, setLogged, setFragments} from "../features/mapContainer/acccountSlice";
import {
    setBoxPoint,
    setInitialData,
    setRepaint,
    setStatus,
    setTFLights
} from "../features/mapContainer/mapContentSlice";

export const wsConnect = createAction<string>("websocket/connect")
export const wsGetMessage = createAction<IncomingWebSocketMessage>('websocket/message')
export const wsSendMessage = createAction<OutcomingWebSocketMessage>('websocket/send')
export const WebSocketListenerMiddleware = createListenerMiddleware()
let ws: WebSocket

WebSocketListenerMiddleware.startListening({
    matcher: isAnyOf(wsConnect, wsGetMessage, wsSendMessage),
    effect: async (action, listenerApi) => {
        if (wsConnect.match(action)) {
            ws = new WebSocket(action.payload)
            ws.onopen = () => console.log("opened")
            ws.onerror = (e) => console.log("error", e)
            ws.onclose = (e) => console.log("closed", e)
            ws.onmessage = (e) => listenerApi.dispatch(wsGetMessage(JSON.parse(e.data)))
        } else if (wsSendMessage.match(action)) {
            ws.send(JSON.stringify(action.payload as OutcomingWebSocketMessage))
        } else if (wsGetMessage.match(action)) {
            switch (action.payload.type) {
                case "mapInfo":
                    listenerApi.dispatch(fillAccountData(action.payload.data as MapInfoMsg))
                    listenerApi.dispatch(setInitialData(action.payload.data as MapInfoMsg))
                    break;
                case "tflight":
                    listenerApi.dispatch(setTFLights(action.payload.data as TflightMsg))
                    break;
                case "repaint":
                    listenerApi.dispatch(setRepaint(action.payload.data as RepaintMsg))
                    break;
                case "jump":
                    listenerApi.dispatch(setBoxPoint(action.payload.data as JumpMsg))
                    break;
                case "login":
                    listenerApi.dispatch(setLogged(action.payload.data as LoginMsg))
                    break;
                case "logOut":
                    listenerApi.dispatch(setLogouted(action.payload.data as LogoutMsg))
                    break;
                case "editCrossUsers":
                    break;
                case "checkConn":
                    listenerApi.dispatch(setStatus(action.payload.data as CheckConnMsg))
                    break;
                case "createFragment":
                    listenerApi.dispatch(setFragments(action.payload.data as ChangeFragmentsMsg))
                    break;
                case "deleteFragment":
                    listenerApi.dispatch(setFragments(action.payload.data as ChangeFragmentsMsg))
                    break;
                case "error":
                    break;
                default:
                    console.log("type not found:", action.payload)
                    break;
            }
        }
    },
})