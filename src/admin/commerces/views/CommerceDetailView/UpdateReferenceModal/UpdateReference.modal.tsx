/* react */
import { memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
/* custom hook */
import { useUpdateReference } from './useUpdateReference.hook';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ModalLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, DraggableMarker, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateReference} rowAlignment="center" colAlignment="center" hasIndentation>
            <PanelLayout orientation="col" className={styles.UpdateReference}>
                <form onSubmit={handleUpdateReference}>
                    <div className={styles.Header} title={translate('commerceedit.references')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('commerceedit.references')}</Legend>
                    </div>

                    <ScrollLayout orientation="col" classNameContent={styles.FormInputs}>
                        <div className={styles.Content}>
                            {updateReferenceFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>

                        <MapContainer
                            center={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                            zoom={10}
                            className={styles.Map}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            <DraggableMarker
                                lat={commerce?.geolocation.latitude ?? 40}
                                lng={commerce?.geolocation.longitude ?? -100}
                                getPosition={handleSetGeolocation}
                            />
                        </MapContainer>
                    </ScrollLayout>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={() => {
                                handleResetUpdateReferenceForm();

                                hideUpdateReference();
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
            </PanelLayout>
        </ModalLayout>
    );
};

export default memo(UpdateReferenceModal);
