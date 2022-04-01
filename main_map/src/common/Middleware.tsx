import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {LoginMsg, MapInfoMsg, WebSocketMessage} from "./index";
import {fillAccountData, setLogged} from "../features/mapContainer/acccountSlice";

export const wsConnect = createAction<string>("websocket/connect")
export const wsMessage = createAction<WebSocketMessage>('websocket/message')
export const WebSocketListenerMiddleware = createListenerMiddleware()
let ws: WebSocket

WebSocketListenerMiddleware.startListening({
    matcher: isAnyOf(wsConnect, wsMessage),
    effect: async (action, listenerApi) => {
        if (wsConnect.match(action)) {
            ws = new WebSocket(action.payload)
            ws.onopen = () => console.log("opened")
            ws.onerror = (e) => console.log("error", e)
            ws.onclose = (e) => console.log("closed", e)
            ws.onmessage = (e) => listenerApi.dispatch(wsMessage(JSON.parse(e.data)))
        } else if (wsMessage.match(action)) {
            switch (action.payload.type) {
                case "mapInfo":
                    listenerApi.dispatch(fillAccountData(action.payload.data as MapInfoMsg))
                    break;
                case "tflight":
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