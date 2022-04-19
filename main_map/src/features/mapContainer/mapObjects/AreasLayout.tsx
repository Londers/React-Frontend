import React from "react";
import {Polygon} from "react-yandex-maps";
import {useAppSelector} from "../../../app/hooks";
import {selectAreaZone} from "../mapContentSlice";

function AreasLayout() {
    const areaZones = useAppSelector(selectAreaZone)
    return (
        <>
            {
                areaZones.map((areaZone) =>
                    <Polygon
                        properties={{
                            // Описываем свойства геообъекта.
                            // Содержимое балуна.
                            hintContent: `Регион: ${areaZone.region}, Район: ${areaZone.area}`
                        }}
                        geometry={[
                            // Указываем координаты вершин многоугольника.
                            // Координаты вершин внешнего контура.
                            areaZone.zone.map((zone) => [zone.Y, zone.X]),
                            // Координаты вершин внутреннего контура.
                            [[0, 0]]
                        ]}
                        modules={['geoObject.addon.hint']}
                        options={{
                            // Задаем опции геообъекта.
                            // Цвет заливки.
                            fillColor: '#614f69',
                            fillOpacity: 0.1,
                            // Ширина обводки.
                            strokeWidth: 5
                        }}
                    >
                    </Polygon>
                )
            }
        </>
    )
}

export default AreasLayout