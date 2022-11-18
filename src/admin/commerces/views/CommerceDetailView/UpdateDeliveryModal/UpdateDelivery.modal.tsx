/* react */
import { memo } from 'react';
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet';
/* custom hook */
import { useUpdateDelivery } from './useUpdateDelivery.hook';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateDelivery.module.scss';

const UpdateDeliveryModal = () => {
    const {
        /* states */
        commerce,
        isUpdateDelivery,
        hideUpdateDelivery,
    } = useCommerceDetailContext();

    const { handleUpdateDelivery, handleResetUpdateDeliveryForm, updateDeliveryFormFields, meters } =
        useUpdateDelivery();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateDelivery} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateDelivery}>
                <form onSubmit={handleUpdateDelivery}>
                    <div className={styles.Header} title={translate('commerceedit.deliveries')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('commerceedit.deliveries')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateDeliveryFormFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <MapContainer
                        center={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                        zoom={11}
                        scrollWheelZoom={false}
                        className={styles.Map}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <Marker
                            position={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                        />

                        {meters && (
                            <Circle
                                center={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                                radius={meters}
                            />
                        )}
                    </MapContainer>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={() => {
                                handleResetUpdateDeliveryForm();

                                hideUpdateDelivery();
                            }}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={translate('actions.update')}>
                            <Legend hasDots justify="center">
                                {translate('actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateDeliveryModal);
