import React, {useCallback, useMemo} from "react";
import {Tflight} from "../../../common";
import {Placemark, YMapsApi} from "react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleTFLightClick} from "../../../common/Middlewares/CommonMiddleware";
import {selectCameras, selectCamerasFlag} from "../mapContentSlice";

function TrafficLightPlacemark(props: { trafficLight: Tflight, ymaps: YMapsApi | null, zoom: number, showNumbers: boolean }) {
    const trafficLight = props.trafficLight
    const statusS = useAppSelector(state => state.mapContent.statusS)
    const statusBD = useAppSelector(state => state.mapContent.statusBD)

    const dispatch = useAppDispatch()

    const camerasFlag = useAppSelector(selectCamerasFlag)
    const cameras = useAppSelector(selectCameras).find(cams =>
        (cams.region === Number(props.trafficLight.region.num)) && (cams.area === Number(props.trafficLight.area.num)) && (cams.id === props.trafficLight.id)
    )

    const getImage = (sost: number) => {
        let cams = ""
        if (camerasFlag && cameras?.cams) cams = "cam"
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return `https://192.168.0.101:4443/free/img/trafficLights/${sost}${cams}.svg`
        } else {
            return window.location.origin + `/free/img/trafficLights/${sost}.svg`
        }
    }

    const createChipsLayout = useCallback((calcFunc: Function, currnum: number, rotateDeg?: number) => {
        if (!statusS || !statusBD) currnum = 18
        let template = props.showNumbers ? `<div style="position: absolute; margin-left: 1vw">${trafficLight.id}</div>` : ``
        template += '<div class="placemark"  ' +
            `style="background-image:url(${getImage(currnum)}); display: revert; ` +
            `background-size: 100%; transform: rotate(${rotateDeg ?? 0}deg);\n">` +
            `</div>`
        const Chips = props.ymaps?.templateLayoutFactory.createClass(
            template, {
                build: function () {
                    Chips.superclass.build.call(this);
                    const map = this.getData().geoObject.getMap();
                    if (!this.inited) {
                        this.inited = true;
                        // Получим текущий уровень зума.
                        let zoom = map.getZoom();
                        // Подпишемся на событие изменения области просмотра карты.
                        map.events.add('boundschange', function () {
                            // Запустим перестраивание макета при изменении уровня зума.
                            const currentZoom = map.getZoom();
                            if (currentZoom !== zoom) {
                                zoom = currentZoom;
                                //@ts-ignore
                                this.rebuild();
                            }
                        }, this);
                    }
                    const options = this.getData().options,
                        // Получим размер метки в зависимости от уровня зума.
                        size = calcFunc(map.getZoom()),
                        element = this.getParentElement().getElementsByClassName('placemark')[0],
                        // По умолчанию при задании своего HTML макета фигура активной области не задается,
                        // и её нужно задать самостоятельно.
                        // Создадим фигуру активной области "Круг".
                        circleShape = {
                            type: 'Circle',
                            coordinates: [0, 0],
                            radius: size / 2
                        };
                    // Зададим высоту и ширину метки.
                    element.style.width = element.style.height = size + 'px';
                    // Зададим смещение.
                    element.style.marginLeft = element.style.marginTop = -size / 2 + 'px';
                    // Зададим фигуру активной области.
                    options.set('shape', circleShape);
                }
            }
        )
        return Chips
    }, [props.ymaps?.templateLayoutFactory, props.showNumbers, trafficLight.id, camerasFlag, cameras])

    //Мастшабирование иконок светофороф на карте
    const calculate = function (zoom: number): number {
        switch (zoom) {
            case 14:
                return 30;
            case 15:
                return 35;
            case 16:
                return 50;
            case 17:
                return 60;
            case 18:
                return 65;
            case 19:
                return 70;
            default:
                return 25;
        }
    }

    const memoizedPlacemark = useMemo(
        () => <Placemark key={trafficLight.idevice}
                         properties={{
                             hintContent: `${trafficLight.description}<br>${trafficLight.tlsost.description}<br>` +
                                 `[${trafficLight.area.num}, ${trafficLight.subarea}, ${trafficLight.id}, ${trafficLight.idevice}]`
                         }}
                         options={{
                             iconLayout: createChipsLayout(calculate, trafficLight.tlsost.num)
                         }}
                         geometry={[trafficLight.points.Y, trafficLight.points.X]}
                         modules={['geoObject.addon.hint']}
                         onClick={() => dispatch(handleTFLightClick(trafficLight))}
        />,
        [createChipsLayout, dispatch, trafficLight]
    )

    return (
        memoizedPlacemark
    )
}

export default TrafficLightPlacemark