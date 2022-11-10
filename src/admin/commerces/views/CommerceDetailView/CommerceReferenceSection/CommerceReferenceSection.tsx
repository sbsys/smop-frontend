/* react */
import { memo } from 'react';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={translate('commercedetail.references')}>
                    <Legend hasDots>{translate('commercedetail.references')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateReference}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Reference}>
                <Legend hasDots>
                    <span className={styles.Title}>{translate('commercedetail.name')}: </span>

                    <span>{commerce?.referenceName}</span>
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{translate('commercedetail.address')}: </span>

                    <span>{commerce?.address}</span>
                </Legend>

                {commerce?.optionalAddress && commerce.optionalAddress !== '-' && (
                    <Legend hasDots>
                        <span className={styles.Title}>{translate('commercedetail.optaddress')}: </span>

                        <span>{commerce?.optionalAddress}</span>
                    </Legend>
                )}

                <Legend hasDots>
                    <span className={styles.Title}>{translate('commercedetail.zipcode')}: </span>

                    <span>{commerce?.zipcode}</span>
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{translate('commercedetail.phones')}: </span>
                </Legend>

                <div className={styles.Phones}>
                    {commerce?.servicePhones.map((phone, index) => (
                        <Legend key={index} hasDots>
                            {phone.phone}
                        </Legend>
                    ))}
                </div>

                <div className={styles.Geoinformation}>
                    <h3 title={translate('commercedetail.geoinfo')}>
                        <Legend hasDots>{translate('commercedetail.geoinfo')}</Legend>
                    </h3>

                    <Legend hasDots>
                        <span className={styles.Title}>{translate('commercedetail.country')}: </span>

                        <span>{commerce?.geoinformation.country}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>{translate('commercedetail.state')}: </span>

                        <span>{commerce?.geoinformation.state}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>{translate('commercedetail.city')}: </span>

                        <span>{commerce?.geoinformation.city}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>{translate('commercedetail.timezone')}: </span>

                        <span>{commerce?.geoinformation.timezone}</span>
                    </Legend>

                    <Legend hasDots>
                        <span className={styles.Title}>{translate('commercedetail.gtmoffset')}: </span>

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
