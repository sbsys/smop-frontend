/* react */
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { Marker as MarkerProps } from 'leaflet';

type Position = {
    lat: number;
    lng: number;
};

const DraggableMarker: FC<
    Position & { getPosition: (latitude: number, longitude: number) => void; isDraggable?: boolean } & ChildrenProps
> = ({ lat, lng, getPosition, isDraggable = true, children }) => {
    const [position, setPosition] = useState<Position>({ lat, lng });

    const markerRef = useRef<MarkerProps | null>(null);

    const map = useMapEvents({});

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;

                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );

    useEffect(() => {
        getPosition(position.lat, position.lng);
    }, [getPosition, position.lat, position.lng]);

    useEffect(() => {
        setPosition({ lat, lng });

        map.flyTo({ lat, lng }, map.getZoom());
    }, [lat, lng, map]);

    return (
        <Marker draggable={isDraggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
            {typeof children === 'function' ? children() : children}
        </Marker>
    );
};

export default memo(DraggableMarker);
