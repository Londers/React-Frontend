import React, {useCallback, useMemo} from "react";
import {Tflight} from "../../../common";
import {Placemark, YMapsApi} from "react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleTFLightClick} from "../../../common/Middlewares/CommonMiddleware";
import {selectCameras, selectCamerasFlag, selectIsInEditing} from "../mapContentSlice";
import Cameras from "./Cameras";
import {selectAuthorized} from "../acccountSlice";

const getInputErrorString = (tflight: Tflight): string => {
    if (!tflight.inputError) return ""

    const inputErrors = {...tflight.input}
    delete inputErrors.S
    const statErrors = [...tflight.input?.S]

    const input = Object.values(inputErrors).map(err => err)
    const stat = statErrors.map((err: boolean) => err)

    let result = ""
    if (input.some(inp => inp)) {
        result += "Ошибка входов ("
        input.forEach((inp, index) => {
            if (inp) result += (index + 1) + ", "
        })
        result = result.slice(0, result.length - 2)
        result += "),"
    }
    if (stat.some(sm => sm)) {
        result += " Ошибка статистики ("
        stat.forEach((sm, index) => {
            if (sm) result += (index + 1) + ", "
        })
        result = result.slice(0, result.length - 2)
        result += "),"
    }
    result = result.slice(0, result.length - 1)
    return result
}

function TrafficLightPlacemark(props: { trafficLight: Tflight, ymaps: YMapsApi | null, zoom: number, showNumbers: boolean }) {
    const trafficLight = props.trafficLight
    const statusS = useAppSelector(state => state.mapContent.statusS)
    const statusBD = useAppSelector(state => state.mapContent.statusBD)

    const dispatch = useAppDispatch()

    const [inEdit, login] = useAppSelector(selectIsInEditing(trafficLight.region.num, trafficLight.area.num, trafficLight.ID))
    const authorized = useAppSelector(selectAuthorized)
    const camerasFlag = useAppSelector(selectCamerasFlag)
    const cameras = useAppSelector(selectCameras).find(cams =>
        (cams.region === Number(props.trafficLight.region.num)) && (cams.area === Number(props.trafficLight.area.num)) && (cams.id === props.trafficLight.ID)
    )

    const getImage = (sost: number) => {
        let cams = ""
        let det = ""
        if (camerasFlag && cameras?.cams) {
            if (trafficLight.inputError) {
                cams = "cdt"
            } else {
                cams = "cam"
            }
        } else {
            det = trafficLight.inputError ? "det" : ""
        }
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return `https://192.168.115.134:4443/free/img/trafficLights/${sost}${cams}${det}.svg`
            // return `https://192.168.0.101:4443/free/img/trafficLights/${sost}${cams}${det}.svg`
        } else {
            return window.location.origin + `/free/img/trafficLights/${sost}${cams}${det}.svg`
        }
    }

    const createChipsLayout = useCallback((calcFunc: Function, currnum: number, rotateDeg?: number) => {
        if (!statusS || !statusBD) currnum = 18
        let template = props.showNumbers ? `<div style="position: absolute; margin-left: 1vw">${trafficLight.ID}</div>` : ``
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
    }, [statusS, statusBD, props.showNumbers, props.ymaps?.templateLayoutFactory, trafficLight.ID, getImage])

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
                             hintContent: authorized ? (`${trafficLight.description}<br>${trafficLight.tlsost.description}<br>` +
                                 `[${trafficLight.area.num}, ${trafficLight.subarea}, ${trafficLight.ID}, ${trafficLight.idevice}]<br>` +
                                 `${getInputErrorString(trafficLight)}${inEdit ? "<br>Управляется пользователем " + login : ""}`) : ""
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
        (camerasFlag && cameras?.cams && props.zoom >= 17) ?
            <Cameras ymaps={props.ymaps} camInfo={cameras} tflight={trafficLight}/> :
            memoizedPlacemark
    )
}

export default TrafficLightPlacemark