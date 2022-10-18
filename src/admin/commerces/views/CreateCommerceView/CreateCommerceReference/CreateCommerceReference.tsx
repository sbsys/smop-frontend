/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';
/* custom hook */
import { useCreateCommerceReference } from './useCreateCommerceReference.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, DraggableMarker, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateCommerceReference.module.scss';

const CreateCommerceReference = () => {
    const { geolocation, meters, handleSetGeolocation, handleToNextTab, createCommerceReferenceFields } =
        useCreateCommerceReference();

    const { t } = useTranslation();

    return (
        <ScrollLayout orientation="col">
            <div className={styles.Reference}>
                <h2 title={t('views.createcommerce.reference.header')}>
                    <Legend hasDots>{t('views.createcommerce.reference.header')}</Legend>
                </h2>

                <div className={styles.Content}>
                    {createCommerceReferenceFields.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}
                </div>

                <MapContainer
                    center={[geolocation.lat, geolocation.lng]}
                    zoom={11}
                    scrollWheelZoom={false}
                    className={styles.Map}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <DraggableMarker lat={geolocation.lat} lng={geolocation.lng} getPosition={handleSetGeolocation} />

                    {meters && <Circle center={[geolocation.lat, geolocation.lng]} radius={meters} />}
                </MapContainer>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.FillSecondary}
                        title={t('actions.nextstep')}
                        onClick={handleToNextTab}>
                        <Legend hasDots justify="center">
                            {t('actions.nextstep')}
                        </Legend>
                    </Button>
                </div>
            </div>
        </ScrollLayout>
    );
};

export default memo(CreateCommerceReference);
