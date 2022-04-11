import React, {createContext, useEffect, useMemo, useRef, useState} from "react";
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
    YMapsApi,
    ListBoxItem,
} from 'react-yandex-maps';
import {Grid} from "@mui/material";
import SideButtons from "./mapButtons/SideButtons";
import TopButtons from "./mapButtons/TopButtons";
import {useAppSelector} from "../../app/hooks";
import {selectAuthorized} from "./acccountSlice";
import LoginDialog from "../../common/LoginDialog";
import TrafficLightPlacemark from "./TrafficLightPlacemark";
import {selectTFLights} from "./mapContentSlice";

export const MapContext = createContext<any | undefined>(undefined);

function MapContainer() {
    const mapRef = useRef<any>(null);
    const [ymaps, setYmaps] = useState<YMapsApi | null>(null)

    const boxPoint = useAppSelector(state => state.mapContent.boxPoint)
    const bounds = useMemo(
        () => [[boxPoint.point0.Y, boxPoint.point0.X], [boxPoint.point1.Y, boxPoint.point1.X]],
        [boxPoint.point0.X, boxPoint.point0.Y, boxPoint.point1.X, boxPoint.point1.Y]
    )
    const authorized = useAppSelector(selectAuthorized)

    const [mapState, setMapState] = useState({
        bounds,
        // zoom: 12,
        autoFitToViewport: true,
    })

    useEffect(() => {
        setMapState({autoFitToViewport: true, bounds: bounds})
    }, [bounds, boxPoint])

    const trafficLights = useAppSelector(selectTFLights)

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
                        {authorized &&
                            <>
                                <ListBoxItem data={{content: "Районы"}}/>
                                <ListBoxItem data={{content: "Подрайоны"}}/>
                                <ListBoxItem data={{content: "Камеры"}}/>
                                <ListBoxItem data={{content: "Направления"}}/>
                                <ListBoxItem data={{content: "Трекер"}}/>
                                <ListBoxItem options={{type: "separator"}}/>
                            </>
                        }
                    </TypeSelector>
                    <FullscreenControl/>
                    <RulerControl options={{float: 'right'}}/>
                    {authorized ?
                        <MapContext.Provider value={mapRef.current}>
                            <TopButtons ymaps={ymaps} width={width}/>
                            <SideButtons ymaps={ymaps} width={width}/>
                        </MapContext.Provider>
                        :
                        <LoginDialog width={width}/>
                    }
                    {trafficLights?.map(trafficLight =>
                        <TrafficLightPlacemark key={trafficLight.idevice} trafficLight={trafficLight} ymaps={ymaps}/>
                    )}
                </Map>
            </YMaps>
        </Grid>
    )
}

export default MapContainer;