import React, {useCallback, useMemo} from "react";
import {Tflight} from "../../../common";
import {Placemark, YMapsApi} from "react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectAuthorized} from "../acccountSlice";
import {handleTFLightClick} from "../../../common/Middlewares/CommonMiddleware";

function TrafficLightPlacemark(props: { trafficLight: Tflight, ymaps: YMapsApi | null }) {
    const trafficLight = props.trafficLight

    const dispatch = useAppDispatch()

    const getImage = (sost: number) => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return `https://192.168.0.101:4443/free/img/trafficLights/${sost}.svg`
        } else {
            return window.location.origin + `/free/img/trafficLights/${sost}.svg`
        }
    }

    const createChipsLayout = useCallback((calcFunc: Function, currnum: number, rotateDeg?: number) => {
        const Chips = props.ymaps?.templateLayoutFactory.createClass(
            '<div class="placemark"  ' +
            `style="background-image:url(${getImage(currnum)}); display: revert; ` +
            `background-size: 100%; transform: rotate(${rotateDeg ?? 0}deg);\n">`+
                 // `<div>${trafficLight.ID}</div>` +
            `</div>`, {
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
    }, [props.ymaps?.templateLayoutFactory])

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
                return 80;
            case 19:
                return 130;
            default:
                return 25;
        }
    }

    const memoizedPlacemark = useMemo(
        () => <Placemark key={trafficLight.idevice}
                         properties={{
                             hintContent: `${trafficLight.description}<br>${trafficLight.tlsost.description}<br>` +
                                 `[${trafficLight.area.num}, ${trafficLight.subarea}, ${trafficLight.ID}, ${trafficLight.idevice}]`
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