/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from 'react-leaflet';
/* custom hook */
import { useUpdateReference } from './useUpdateReference.hook';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, DraggableMarker, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateReference.module.scss';

const UpdateReferenceModal = () => {
    const {
        /* states */
        commerce,
        isUpdateReference,
        hideUpdateReference,
    } = useCommerceDetailContext();

    const { handleUpdateReference, handleResetUpdateReferenceForm, handleSetGeolocation, updateReferenceFormFields } =
        useUpdateReference();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateReference} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateReference}>
                <form onSubmit={handleUpdateReference}>
                    <div className={styles.Header} title={t('views.commercedetail.updatereference.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.commercedetail.updatereference.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateReferenceFormFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <MapContainer
                        center={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                        zoom={15}
                        scrollWheelZoom={false}
                        className={styles.Map}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <DraggableMarker
                            lat={commerce?.geolocation.latitude ?? 0}
                            lng={commerce?.geolocation.longitude ?? 0}
                            getPosition={handleSetGeolocation}
                        />
                    </MapContainer>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.commercedetail.updatereference.actions.cancel')}
                            onClick={() => {
                                handleResetUpdateReferenceForm();

                                hideUpdateReference();
                            }}>
                            <Legend hasDots justify="center">
                                {t('views.commercedetail.updatereference.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.commercedetail.updatereference.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.commercedetail.updatereference.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateReferenceModal);
