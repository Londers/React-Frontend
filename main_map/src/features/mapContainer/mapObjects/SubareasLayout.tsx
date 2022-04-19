import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectAreaZone} from "../mapContentSlice";
import {Polygon} from "react-yandex-maps";

function SubareasLayout() {
    const areaZones = useAppSelector(selectAreaZone)
    return (
        <>
            {
                areaZones.map((areaZone) =>
                    areaZone.sub.map((subarea) =>
                        <Polygon
                            properties={{
                                // Описываем свойства геообъекта.
                                // Содержимое балуна.
                                hintContent: `Регион: ${areaZone.region}, Район: ${areaZone.area}, Подрайон: ${subarea.subArea}`
                            }}
                            geometry={[
                                // Указываем координаты вершин многоугольника.
                                // Координаты вершин внешнего контура.
                                subarea.zone.map((zone) => [zone.Y, zone.X]),
                                // Координаты вершин внутреннего контура.
                                [[0, 0]]
                            ]}
                            modules={['geoObject.addon.hint']}
                            options={{
                                // Задаем опции геообъекта.
                                // Цвет заливки.
                                fillColor: 'rgb(97,79,105)',
                                fillOpacity: 0.1,
                                // Ширина обводки.
                                strokeWidth: 5
                            }}
                        >
                        </Polygon>
                    )
                )
            }
        </>
    )
}

export default SubareasLayout