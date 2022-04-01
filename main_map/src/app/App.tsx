import React, {useEffect} from 'react';
import './App.sass';
import MapContainer from "../features/mapContainer/MapContainer";
import MapAppBar from "../features/mapAppBar/MapAppBar";
import {useAppDispatch} from "./hooks";
import {wsConnect} from "../common/Middleware";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(wsConnect("wss://192.168.115.134:4443/mapW"))
  })

  return (
    <div className="App" style={{height: window.innerHeight}}>
      <MapAppBar />
      <MapContainer />
    </div>
  );
}

export default App;