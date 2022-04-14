import React from "react";
import {Circle as CircleType} from "../../../common";
import {Circle} from "react-yandex-maps";

function CustomCircle(props: { circle: CircleType, zoom: number }) {
    const radiusCalculate = () => {
        switch (props.zoom) {
            case 3:
                return 32000;
            case 4:
                return 16000;
            case 5:
                return 8000;
            case 6:
                return 4000;
            case 7:
                return 2000;
            case 8:
                return 1000;
            case 9:
                return 750;
            case 10:
                return 500;
            case 11:
                return 400;
            case 12:
                return 300;
            case 13:
                return 250;
            case 14:
                return 200;
            case 15:
                return 150;
            case 16:
                return 100;
            case 17:
                return 75;
            case 18:
                return 50;
            case 19:
                return 40;
            default:
                return 30;
        }
    }

    return (
        <Circle
            geometry={
                Object.values(
                    {
                        // The coordinates of the center of the circle.
                        coordinates: props.circle.coords,
                        // The radius of the circle in meters.
                        radius: radiusCalculate(),
                    }
                )
            }
            options={{
                // Setting the circle options.
                // Enabling drag-n-drop for the circle.
                draggable: false,
                // Fill color. The last byte (77) defines transparency.
                // The transparency of the fill can also be set using
                // the option "fillOpacity".
                fillColor: '#DB709377',
                // Stroke color.
                strokeColor: '#990066',
                // Stroke transparency.
                strokeOpacity: 0.8,
                // The width of the stroke in pixels.
                strokeWidth: 5,
            }}
        />
    )
}

export default CustomCircle