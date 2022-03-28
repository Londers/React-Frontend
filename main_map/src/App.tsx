import React, {useEffect} from 'react';
import './App.sass';
import MapContainer from "./Components/MapContainer/MapContainer";
import ButtonsToolbar from "./Components/ButtonsToolbar/ButtonsToolbar";

function App() {

  useEffect(() => {
    const ws = new WebSocket("wss://192.168.115.134:4443/mapW")
    ws.onopen = () => console.log("opened")
    ws.onerror = (e) => console.log("error", e)
    ws.onclose = (e) => console.log("closed", e)
  })

  return (
    <div className="App" style={{height: window.innerHeight}}>
      <ButtonsToolbar></ButtonsToolbar>
      <MapContainer></MapContainer>
    </div>
  );
}

export default App;