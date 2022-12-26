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
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAuthorized} from "./acccountSlice";
import LoginDialog from "../login/LoginDialog";
import TrafficLightPlacemark from "./mapObjects/TrafficLightPlacemark";
import {selectCircles, selectTFLights, setCamerasSelect} from "./mapContentSlice";
import CustomCircle from "./mapObjects/CustomCircle";
import AboutModal from "../about/AboutModal";
import AreasLayout from "./mapObjects/AreasLayout";
import SubareasLayout from "./mapObjects/SubareasLayout";
import {wsSendMessage} from "../../common/Middlewares/WebSocketMiddleware";
import {Tflight} from "../../common";

export const MapContext = createContext<any | undefined>(undefined);

function MapContainer() {
    const dispatch = useAppDispatch()
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
    const [zoom, setZoom] = useState<number>(18)

    useEffect(() => {
        setMapState({autoFitToViewport: true, bounds: bounds})
    }, [bounds, boxPoint])

    const trafficLights = useAppSelector(selectTFLights)
    const circles = useAppSelector(selectCircles)

    const [showAreas, setShowAreas] = useState<boolean>(false)
    const [showSubareas, setShowSubareas] = useState<boolean>(false)
    const [showCameras, setShowCameras] = useState<boolean>(false)
    const [showNumbers, setShowNumbers] = useState<boolean>(false)

    const handleCamerasLayoutClick = () => {
        dispatch(wsSendMessage({type: "getCameras"}))
        dispatch(setCamerasSelect(!showCameras))
        setShowCameras(!showCameras)
    }

    const width = "200"

    // Провайдер данных для элемента управления ymaps.control.SearchControl.
    // Осуществляет поиск геообъектов в по массиву points.
    // Реализует интерфейс IGeocodeProvider.
    function CustomSearchProvider(points: Tflight[]) {
        //@ts-ignore
        this.points = points;
    }

    // Провайдер ищет по полю text стандартным методом String.ptototype.indexOf.
    CustomSearchProvider.prototype.geocode = function (request: string, options: { skip: number, results: number }) {
        //@ts-ignore
        let deferred = new ymaps.vow.defer(),
            //@ts-ignore
            geoObjects = new ymaps.GeoObjectCollection(),
            // Сколько результатов нужно пропустить.
            offset = options.skip || 0,
            // Количество возвращаемых результатов.
            limit = options.results || 20;

        if (!authorized) limit = 0
        let points: Tflight[] = [];
        // Ищем в свойстве text каждого элемента массива.
        for (let i = 0, l = this.points.length; i < l; i++) {
            let point = this.points[i];
            if (point.description.toLowerCase().indexOf(request.toLowerCase()) !== -1) {
                points.push(point);
            } else if (point.idevice.toString().indexOf(request.toLowerCase()) !== -1) {
                points.push(point);
            }
        }
        // При формировании ответа можно учитывать offset и limit.
        points = points.splice(offset, limit);
        // Добавляем точки в результирующую коллекцию.
        for (let i = 0, l = points.length; i < l; i++) {
            let point = points[i],
                coords = [point.points.Y, point.points.X],
                text = point.description;
            //@ts-ignore
            geoObjects.add(new ymaps.Placemark(coords, {
                name: text,
                description: "№модема " + point.idevice,
                balloonContentBody: '<p>' + text + '</p>',
                boundedBy: [coords, coords]
            }));
        }

        deferred.resolve({
            // Геообъекты поисковой выдачи.
            geoObjects: geoObjects,
            // Метаинформация ответа.
            metaData: {
                geocoder: {
                    // Строка обработанного запроса.
                    request: request,
                    // Количество найденных результатов.
                    found: geoObjects.getLength(),
                    // Количество возвращенных результатов.
                    results: limit,
                    // Количество пропущенных результатов.
                    skip: offset
                }
            }
        });

        // Возвращаем объект-обещание.
        return deferred.promise();
    };

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
                    modules={["templateLayoutFactory", "GeoObjectCollection"]}
                    state={mapState}
                    instanceRef={(ref) => {
                        if (ref) {
                            mapRef.current = ref
                            mapRef.current.events.add(["boundschange"], () => setZoom(mapRef.current.getZoom()))
                        }
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
                            //@ts-ignore
                            provider: new CustomSearchProvider(trafficLights),
                            size: "large",
                            resultsPerPage: 5,
                            noPlacemark: true,
                        }}
                    />
                    <TrafficControl options={{float: 'right'}}/>
                    <TypeSelector options={{float: 'right'}}>
                        {authorized &&
                            <>
                                <ListBoxItem
                                    options={{selectOnClick: false}}
                                    state={{selected: showAreas}}
                                    data={{content: "Районы"}}
                                    onClick={() => setShowAreas(!showAreas)}
                                />
                                <ListBoxItem
                                    options={{selectOnClick: false}}
                                    state={{selected: showSubareas}}
                                    data={{content: "Подрайоны"}}
                                    onClick={() => setShowSubareas(!showSubareas)}
                                />
                                <ListBoxItem
                                    options={{selectOnClick: false}}
                                    state={{selected: showCameras}}
                                    data={{content: "Камеры"}}
                                    onClick={handleCamerasLayoutClick}
                                />
                                <ListBoxItem data={{content: "Направления"}}/>
                                <ListBoxItem data={{content: "Трекер"}}/>
                                <ListBoxItem
                                    options={{selectOnClick: false}}
                                    state={{selected: showNumbers}}
                                    data={{content: "Номера СО"}}
                                    onClick={() => setShowNumbers(!showNumbers)}
                                />
                                <ListBoxItem options={{type: "separator"}}/>
                            </>
                        }
                    </TypeSelector>
                    <FullscreenControl/>
                    <RulerControl options={{float: 'right'}}/>
                    {authorized ?
                        <MapContext.Provider value={mapRef.current}>
                            <TopButtons ymaps={ymaps} width={width}/>
                            <SideButtons ymaps={ymaps} width={width} bounds={bounds} zoom={zoom}/>
                            <AboutModal close={true}/>
                        </MapContext.Provider>
                        :
                        <LoginDialog width={width}/>
                    }
                    {trafficLights?.map(trafficLight =>
                        <TrafficLightPlacemark key={trafficLight.idevice} trafficLight={trafficLight}
                                               ymaps={ymaps} zoom={zoom} showNumbers={showNumbers}/>
                    )}
                    {showAreas && <AreasLayout/>}
                    {showSubareas && <SubareasLayout/>}
                    {circles?.map((circle, index) =>
                        <CustomCircle key={index} circle={circle} zoom={zoom}/>
                    )}
                </Map>
            </YMaps>
        </Grid>
    )
}

export default MapContainer;