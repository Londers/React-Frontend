import React, {useEffect} from 'react';
import './App.sass';
import MapContainer from "../features/mapContainer/MapContainer";
import MapAppBar from "../features/mapAppBar/MapAppBar";
import {useAppDispatch} from "./hooks";
import {fillAccountData} from "../features/mapContainer/acccountSlice";
import {MapInfo} from "../common";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const ws = new WebSocket("wss://192.168.115.134:4443/mapW")
    ws.onopen = () => console.log("opened")
    ws.onerror = (e) => console.log("error", e)
    ws.onclose = (e) => console.log("closed", e)
    ws.onmessage = (e) => {
      dispatch(fillAccountData(JSON.parse(e.data).data as MapInfo))
    }
  })

  return (
    <div className="App" style={{height: window.innerHeight}}>
      <MapAppBar />
      <MapContainer />
    </div>
  );
}

export default App;