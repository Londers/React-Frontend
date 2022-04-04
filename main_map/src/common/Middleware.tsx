import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {IncomingDataType, LoginMsg, MapInfoMsg, OutcomingDataType, TflightMsg, WebSocketMessage} from "./index";
import {fillAccountData, setLogged} from "../features/mapContainer/acccountSlice";
import {setInitialData, setTFLights} from "../features/mapContainer/mapContentSlice";

export const wsConnect = createAction<string>("websocket/connect")
export const wsGetMessage = createAction<WebSocketMessage<IncomingDataType>>('websocket/message')
export const wsSendMessage = createAction<WebSocketMessage<OutcomingDataType>>('websocket/send')
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
            ws.send(JSON.stringify(action.payload as WebSocketMessage<OutcomingDataType>))
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
                    break;
                case "jump":
                    break;
                case "login":
                    listenerApi.dispatch(setLogged(action.payload.data as LoginMsg))
                    break;
                case "logOut":
                    break;
                case "editCrossUsers":
                    break;
                case "checkConn":
                    break;
                case "createFragment":
                    break;
                case "deleteFragment":
                    break;
                case "error":
                    break;
                default:
                    console.log(action.type)
                    break;
            }
        }
    },
})