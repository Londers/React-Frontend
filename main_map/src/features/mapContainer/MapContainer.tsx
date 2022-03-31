import React, {useRef, useState} from "react";
import {
    YMaps,
    Map,
    SearchControl,
    ZoomControl,
    TypeSelector,
    TrafficControl,
    RulerControl,
    GeolocationControl,
    FullscreenControl,
    YMapsApi, ListBoxItem,
} from 'react-yandex-maps';
import {Grid} from "@mui/material";
import SideButtons from "./mapButtons/SideButtons";
import TopButtons from "./mapButtons/TopButtons";

function MapContainer() {
    const mapRef = useRef<any>(null);
    const [ymaps, setYmaps] = useState<YMapsApi | null>(null)
    // const ymapsRef = useRef<YMapsApi | null>(null);
    const mapState = {
        center: [55.739625, 37.5412],
        zoom: 12,
        autoFitToViewport: true,
    };
    const width = "200"

    return (
        <Grid container height={"96.5vh"}>
            <YMaps query={{apikey: "65162f5f-2d15-41d1-a881-6c1acf34cfa1", lang: "ru_RU"}}>
                <Map
                    onLoad={(ref) => {
                        if (ref) {
                            setYmaps(ref)
                            // ymapsRef.current = ref
                        }
                    }}
                    modules={["templateLayoutFactory"]}
                    state={mapState}
                    instanceRef={(ref) => {
                        if (ref) mapRef.current = ref
                    }}
                    width={"100vw"}
                    height={"100%"}
                >
                    <GeolocationControl options={{float: 'left'}}/>
                    <ZoomControl options={{float: 'right'}}/>
                    <SearchControl
                        // instanceRef={(ref) => {
                        //     if (ref) searchRef.current = ref;
                        // }}
                        options={{
                            float: "left",
                            provider: "yandex#search",
                            size: "large"
                        }}
                    />
                    <TrafficControl options={{float: 'right'}}/>
                    <TypeSelector options={{float: 'right'}}>
                        <ListBoxItem options={{selectOnClick: true}} data={{ content: "Районы" }} />
                        <ListBoxItem options={{selectOnClick: true}} data={{ content: "Подрайоны" }} />
                        <ListBoxItem options={{selectOnClick: true}} data={{ content: "Камеры" }} />
                        <ListBoxItem options={{selectOnClick: true}} data={{ content: "Направления" }} />
                        <ListBoxItem options={{selectOnClick: true}} data={{ content: "Трекер" }} />
                        <ListBoxItem options={{type: "separator"}} />
                    </TypeSelector>
                    <FullscreenControl/>
                    <RulerControl options={{float: 'right'}}/>
                    <React.Fragment>
                        <TopButtons width={width}/>
                        <SideButtons ymaps={ymaps} width={width}/>
                    </React.Fragment>
                </Map>
            </YMaps>
        </Grid>
    )
}

export default MapContainer;