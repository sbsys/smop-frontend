/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Button, Legend } from 'shared/components';
/* utils */
import { milesToMeters } from 'shared/utils';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../CommerceDetail.module.scss';
import styles from './CommerceReferenceSection.module.scss';

const CommerceReferenceSection = () => {
    const {
        /* states */
        commerce,
        showUpdateReference,
    } = useCommerceDetailContext();

    const meters = milesToMeters(Number.parseFloat(commerce?.deliveryArea || '0'));

    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.commercedetail.referencesection.title')}>
                    <Legend hasDots>{t('views.commercedetail.referencesection.title')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateReference}
                    title={t('views.commercedetail.referencesection.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Reference}>
                <Legend hasDots>
                    <span className={styles.Title}>{t('views.commercedetail.referencesection.name')}: </span>

                    <span>{commerce?.referenceName}</span>
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{t('views.commercedetail.referencesection.address')}: </span>

                    <span>{commerce?.address}</span>
                </Legend>

                {commerce?.optionalAddress && commerce.optionalAddress !== '-' && (
                    <Legend hasDots>
                        <span className={styles.Title}>{t('views.commercedetail.referencesection.optaddress')}: </span>

                        <span>{commerce?.optionalAddress}</span>
                    </Legend>
                )}

                <Legend hasDots>
                    <span className={styles.Title}>{t('views.commercedetail.referencesection.zipcode')}: </span>

                    <span>{commerce?.zipcode}</span>
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{t('views.commercedetail.referencesection.phones')}: </span>
                </Legend>

                <div className={styles.Phones}>
                    {commerce?.servicePhones.map((phone, index) => (
                        <Legend key={index} hasDots>
                            {phone.phoneNumber}
                        </Legend>
                    ))}
                </div>

                <div className={styles.Geoinformation}>
                    <h3 title={t('views.commercedetail.referencesection.geoinformation.title')}>
                        <Legend hasDots>{t('views.commercedetail.referencesection.geoinformation.title')}</Legend>
                    </h3>

                    <Legend hasDots>
                        <span className={styles.Title}>
                            {t('views.commercedetail.referencesection.geoinformation.country')}:{' '}
                        </span>

                        <span>{commerce?.geoinformation.country}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>
                            {t('views.commercedetail.referencesection.geoinformation.state')}:{' '}
                        </span>

                        <span>{commerce?.geoinformation.state}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>
                            {t('views.commercedetail.referencesection.geoinformation.city')}:{' '}
                        </span>

                        <span>{commerce?.geoinformation.city}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>
                            {t('views.commercedetail.referencesection.geoinformation.timezone')}:{' '}
                        </span>

                        <span>{commerce?.geoinformation.timezone}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>
                            {t('views.commercedetail.referencesection.geoinformation.gtmOffset')}:{' '}
                        </span>

                        <span>{commerce?.geoinformation.gtmOffset}</span>
                    </Legend>

                    {/* {commerce?.geolocation} */}
                </div>

                {commerce?.geolocation.latitude && commerce?.geolocation.longitude && (
                    <MapContainer
                        center={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                        zoom={12}
                        scrollWheelZoom={false}
                        className={styles.Map}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <Marker position={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}>
                            <Popup>
                                <Legend title={commerce?.address} hasDots>
                                    {commerce?.address}
                                </Legend>
                            </Popup>
                        </Marker>

                        {meters && (
                            <Circle
                                center={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                                radius={meters}
                            />
                        )}
                    </MapContainer>
                )}
            </div>
        </section>
    );
};

export default memo(CommerceReferenceSection);
