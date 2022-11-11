import React from "react";
import {Placemark, Polygon, YMapsApi} from "react-yandex-maps";
import {CamsInfo, Tflight} from "../../../common";
import {openTab} from "../mapButtons/SideButtons";

// Условные значения для установки камер относительно центра перекрёстка (географ. коорд.) и угла обзора камер
const lengthVar = 0.00015;
const viewingAngle = 30;

// Расчёт Координат конца отрезка при известных координатах начала, длине отрезка и угле его наклона
function calculatePointCoords(startY: number, startX: number, length: number, angle: number): [number, number] {
    const endX = startX - length * Math.cos(angle * (Math.PI / 180));
    const endY = startY + length * Math.sin(angle * (Math.PI / 180));
    return [endY, endX];
}

function Cameras(props: { ymaps: YMapsApi | null, camInfo: CamsInfo, tflight: Tflight }) {

    const createChipsLayout = (rotateDeg: number) => {
        // if (!statusS || !statusBD) currnum = 18
        // let template = props.showNumbers ? `<div style="position: absolute; margin-left: 1vw">${trafficLight.id}</div>` : ``
        let template = '<div class="placemark"  ' +
            `style="background-image:url(${window.location.origin}/free/img/trafficLights/${props.tflight.inputError ? "camErr" : "cam"}.svg); display: revert; ` +
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
                        size = 50,
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
    }

    return (
        <>
            {props.camInfo.cams.map((cam, i) => {
                const [y, x] = [props.tflight.points.Y, props.tflight.points.X]
                const camAngleRadians = (360 - cam.angleCam) * (Math.PI / 180);
                const camDirectionAngle = cam.angleArea;
                const camX = x + lengthVar * Math.cos(camAngleRadians)
                const camY = y + lengthVar * Math.sin(camAngleRadians)
                const searchStr = 'Region=' + props.camInfo.region + '&Area=' + props.camInfo.area + '&ID=' + props.camInfo.id

                return (
                    <div key={i}>
                        <Placemark
                            geometry={[camY, camX]}
                            properties={{
                                hintContent: cam.name,
                            }}
                            options={{
                                iconLayout: createChipsLayout(camDirectionAngle)
                            }}
                            modules={['geoObject.addon.hint']}
                            onClick={() => openTab('/cameras?' + searchStr)}
                        />
                        <Polygon
                            geometry={[[
                                [camY, camX],
                                calculatePointCoords(camY, camX, lengthVar * 2, ((camDirectionAngle - 180)) - (viewingAngle / 2)),
                                calculatePointCoords(camY, camX, lengthVar * 2, ((camDirectionAngle - 180)) + (viewingAngle / 2)),
                            ]]}
                            properties={{fillColor: "rgba(0,255,0,0.15)", strokeWidth: 1}}
                        />
                    </div>
                )
            })}
        </>
    )
}

export default Cameras