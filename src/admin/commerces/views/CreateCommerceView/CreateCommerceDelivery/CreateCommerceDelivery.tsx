/* react */
import { memo } from 'react';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* custom hook */
import { useCreateCommerceDelivery } from './useCreateCommerceDelivery.hook';
/* components */
import { DraggableMarker, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* styles */
import styles from './CreateCommerceDelivery.module.scss';

const CreateCommerceDelivery = () => {
    const {
        /* states */
        tabRef,
    } = useCreateCommerceContext();

    const { createCommerceDeliveryFields, geolocation, meters } = useCreateCommerceDelivery();

    const { translate } = useAdminLang();

    return (
        <div className={styles.Delivery}>
            <h2 title={translate('createcommerce.deliveries')}>
                <Legend hasDots>{translate('createcommerce.deliveries')}</Legend>
            </h2>

            <div className={styles.Content}>
                {createCommerceDeliveryFields.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}
            </div>

            {tabRef.current?.currentTabIndex === 1 && (
                <MapContainer
                    center={[geolocation.lat, geolocation.lng]}
                    zoom={11}
                    scrollWheelZoom={false}
                    className={styles.Map}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* <Marker position={[geolocation.lat, geolocation.lng]} /> */}
                    <DraggableMarker
                        lat={geolocation.lat}
                        lng={geolocation.lng}
                        getPosition={() => {}}
                        isDraggable={false}
                    />

                    {meters && <Circle center={[geolocation.lat, geolocation.lng]} radius={meters} />}
                </MapContainer>
            )}
        </div>
    );
};

export default memo(CreateCommerceDelivery);
