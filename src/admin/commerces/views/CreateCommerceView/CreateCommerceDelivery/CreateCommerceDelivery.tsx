/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* custom hook */
import { useCreateCommerceDelivery } from './useCreateCommerceDelivery.hook';
/* components */
import { DraggableMarker, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import styles from './CreateCommerceDelivery.module.scss';

const CreateCommerceDelivery = () => {
    const {
        /* states */
        tabRef,
    } = useCreateCommerceContext();

    const { createCommerceDeliveryFields, geolocation, meters } = useCreateCommerceDelivery();

    const { t } = useTranslation();

    return (
        <div className={styles.Delivery}>
            <h2 title={t('views.createcommerce.delivery.header')}>
                <Legend hasDots>{t('views.createcommerce.delivery.header')}</Legend>
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
