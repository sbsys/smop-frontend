/* react */
import { FC, memo, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Marker, useMapEvents } from 'react-leaflet';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { DivIcon, Marker as MarkerProps } from 'leaflet';
/* assets */
import { MdLocationPin } from 'react-icons/md';

type Position = {
    lat: number;
    lng: number;
};

type IconProps = {
    className?: string;
    icon?: ReactElement;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
};

const DraggableMarker: FC<
    Position & { getPosition: (latitude: number, longitude: number) => void; isDraggable?: boolean } & IconProps &
        ChildrenProps
> = ({
    lat,
    lng,
    getPosition,
    isDraggable = true,
    className,
    icon = <MdLocationPin />,
    iconSize = [32, 32],
    iconAnchor = [16, 32],
    children,
}) => {
    const [position, setPosition] = useState<Position>({ lat, lng });

    const markerRef = useRef<MarkerProps | null>(null);

    const map = useMapEvents(
        isDraggable
            ? {
                  click(event) {
                      setPosition(event.latlng);
                  },
              }
            : {}
    );

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

    const customIcon = useMemo(
        () =>
            new DivIcon({
                html: renderToString(icon),
                iconSize,
                iconAnchor,
                className,
            }),
        [className, icon, iconAnchor, iconSize]
    );

    /* reactivity */
    useEffect(() => {
        getPosition(position.lat, position.lng);
    }, [getPosition, position.lat, position.lng]);

    useEffect(() => {
        setPosition({ lat, lng });

        map.flyTo({ lat, lng }, map.getZoom());
    }, [lat, lng, map]);

    return (
        <Marker
            icon={customIcon}
            draggable={isDraggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            {typeof children === 'function' ? children() : children}
        </Marker>
    );
};

export default memo(DraggableMarker);
