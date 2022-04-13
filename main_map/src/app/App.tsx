import React, {useEffect} from 'react';
import './App.sass';
import MapContainer from "../features/mapContainer/MapContainer";
import MapAppBar from "../features/mapAppBar/MapAppBar";
import {useAppDispatch} from "./hooks";
import {wsConnect} from "../common/Middlewares/WebSocketMiddleware";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            dispatch(wsConnect("wss://192.168.115.134:4443/mapW"))
        } else {
            dispatch(wsConnect(`wss://${window.location.host}/mapW`))
        }
    })

    return (
        <div className="App" style={{height: window.innerHeight}}>
            <MapAppBar/>
            <MapContainer/>
        </div>
    );
}

export default App;