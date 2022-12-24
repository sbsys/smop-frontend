/* react */
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Circle, Polyline, MapContainer, Popup, TileLayer } from 'react-leaflet';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { DraggableMarker, Legend } from 'shared/components';
import ServiceHoursTable from './ServiceHoursTable';
/* hooks */
import { useClientsLang } from 'admin/core';
/* utils */
import { amountFormat, classNames, milesToMeters } from 'shared/utils';
/* types */
import { ServiceHours } from 'admin/clients/types';
/* assets */
import { MdCheckCircle, MdMyLocation, MdStore } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
/* styles */
import styles from './CommerceInfo.module.scss';

const CommerceInfo = () => {
    const {
        /* states */
        commerce,
    } = useCommerceDetailContext();

    const meters = useMemo(() => milesToMeters(commerce?.deliveryArea ?? 0), [commerce?.deliveryArea]);

    const [geolocation, setGeolocation] = useState<{
        lat: number;
        lng: number;
    }>({
        lat: 40,
        lng: -100,
    });

    const { translate } = useClientsLang();

    /* functions */
    const getCurrentGeolocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setGeolocation({ lat: coords.latitude, lng: coords.longitude });
        });
    }, []);

    /* reactivity */
    useEffect(() => {
        getCurrentGeolocation();
    }, [getCurrentGeolocation]);

    return (
        <ScrollLayout orientation="col">
            <div className={styles.CommerceInfo}>
                <section>
                    <div className={styles.Header}>
                        <h2 title={commerce?.referenceName}>
                            <Legend hasDots justify="center">
                                {commerce?.referenceName}
                            </Legend>
                        </h2>
                    </div>

                    <div className={styles.Content}>
                        <div>
                            <Legend title={commerce?.address}>
                                <span className={styles.Title}>{translate('commons.address')}: </span>

                                <span>{commerce?.address}</span>
                            </Legend>

                            {commerce?.optionalAddress ?? (
                                <Legend title={commerce?.optionalAddress}>
                                    <span className={styles.Title}>{translate('commons.address')}: </span>

                                    <span>{commerce?.optionalAddress}</span>
                                </Legend>
                            )}

                            <Legend title={commerce?.zipcode}>
                                <span className={styles.Title}>ZIP Code: </span>

                                <span>{commerce?.zipcode}</span>
                            </Legend>

                            <div className={styles.Group}>
                                <Legend hasDots className={styles.Title} title={translate('commons.phone')}>
                                    {translate('commons.phone')}
                                </Legend>

                                {commerce?.servicePhones?.map((phone, index) => (
                                    <Legend key={index} hasDots title={phone.phone}>
                                        {phone.phone}
                                    </Legend>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Legend title={commerce?.geoinformation.country}>
                                <span className={styles.Title}>{translate('commercedetail.country')}: </span>

                                <span>{commerce?.geoinformation.country}</span>
                            </Legend>

                            <Legend title={commerce?.geoinformation.state}>
                                <span className={styles.Title}>{translate('commercedetail.state')}: </span>

                                <span>{commerce?.geoinformation.state}</span>
                            </Legend>

                            <Legend title={commerce?.geoinformation.city}>
                                <span className={styles.Title}>{translate('commercedetail.city')}: </span>

                                <span>{commerce?.geoinformation.city}</span>
                            </Legend>

                            <Legend title={commerce?.geoinformation.timezone}>
                                <span className={styles.Title}>{translate('commercedetail.timezone')}: </span>

                                <span>{commerce?.geoinformation.timezone}</span>
                            </Legend>

                            <Legend title={commerce?.geoinformation.gtmOffset}>
                                <span className={styles.Title}>{translate('commercedetail.gtmoffset')}: </span>

                                <span>{commerce?.geoinformation.gtmOffset}</span>
                            </Legend>

                            <Legend title={`${commerce?.deliveryArea} ${translate('longitude.miles')}`}>
                                <span className={styles.Title}>{translate('commercedetail.deliveryarea')}: </span>

                                <span>
                                    {commerce?.deliveryArea} {translate('longitude.miles')}
                                </span>
                            </Legend>
                        </div>

                        {commerce?.geolocation.latitude && commerce?.geolocation.longitude && (
                            <MapContainer
                                center={[commerce?.geolocation.latitude ?? 0, commerce?.geolocation.longitude ?? 0]}
                                zoom={15}
                                className={styles.Map}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                {geolocation.lat !== 40 && geolocation.lng !== -100 && (
                                    <Polyline
                                        className={styles.MapLine}
                                        positions={[
                                            [
                                                commerce?.geolocation.latitude ?? 40,
                                                commerce?.geolocation.longitude ?? -100,
                                            ],
                                            [geolocation.lat, geolocation.lng],
                                        ]}
                                    />
                                )}

                                <DraggableMarker
                                    isDraggable={false}
                                    lat={commerce?.geolocation.latitude ?? 40}
                                    lng={commerce?.geolocation.longitude ?? -100}
                                    getPosition={() => {}}
                                    icon={<MdStore />}
                                    iconSize={[28, 28]}
                                    iconAnchor={[14, 14]}
                                    className={styles.Marker}>
                                    <Popup>
                                        <Legend title={commerce?.address}>{commerce?.address}</Legend>
                                    </Popup>
                                </DraggableMarker>

                                {meters && (
                                    <Circle
                                        className={styles.MapArea}
                                        center={[
                                            commerce?.geolocation.latitude ?? 40,
                                            commerce?.geolocation.longitude ?? -100,
                                        ]}
                                        radius={meters}
                                    />
                                )}

                                <DraggableMarker
                                    isDraggable={false}
                                    isFlyingTo={false}
                                    lat={geolocation.lat}
                                    lng={geolocation.lng}
                                    getPosition={() => {}}
                                    icon={<MdMyLocation />}
                                    iconSize={[24, 24]}
                                    iconAnchor={[12, 12]}
                                    className={styles.CurrentPosition}
                                />
                            </MapContainer>
                        )}
                    </div>
                </section>

                <section>
                    <div className={styles.Header}>
                        <h3 title={translate('commons.online')}>
                            <Legend hasDots justify="center">
                                {translate('commons.online')}
                            </Legend>
                        </h3>
                    </div>

                    <div className={styles.Content}>
                        <div>
                            <div
                                className={styles.OrderOnline}
                                title={translate(`commons.${commerce?.orderOnline ? 'online' : 'offline'}`)}>
                                <Legend className={styles.Title} hasDots>
                                    {translate(`commons.${commerce?.orderOnline ? 'online' : 'offline'}`)}
                                </Legend>

                                <i className={classNames(commerce?.orderOnline ? styles.Online : styles.Offline)}>
                                    {commerce?.orderOnline ? <MdCheckCircle /> : <IoMdCloseCircle />}
                                </i>
                            </div>
                        </div>

                        <div>
                            <Legend hasDots title={`$ ${amountFormat(commerce?.minAmountDelivery ?? 0, 2)}`}>
                                <span className={styles.Title}>{translate('commercedetail.mindelivery')}: </span>

                                <span>$ {amountFormat(commerce?.minAmountDelivery ?? 0, 2)}</span>
                            </Legend>
                        </div>

                        <div className={styles.Group}>
                            <Legend justify="center" hasDots title={translate('commercedetail.onsitepreparation')}>
                                <span className={styles.Title}>{translate('commercedetail.onsitepreparation')}</span>
                            </Legend>

                            <Legend justify="center" hasDots>
                                <span>{commerce?.onsitePreparationTime.hours}</span>
                                <span> {translate('time.hours')}</span>
                                <span> & </span>
                                <span>{commerce?.onsitePreparationTime.minutes}</span>
                                <span> {translate('time.minutes')}</span>
                            </Legend>
                        </div>

                        <div className={styles.Group}>
                            <Legend justify="center" hasDots title={translate('commercedetail.deliverypreparation')}>
                                <span className={styles.Title}>{translate('commercedetail.deliverypreparation')}</span>
                            </Legend>

                            <Legend justify="center" hasDots>
                                <span>{commerce?.deliveryPreparationTime.hours}</span>
                                <span> {translate('time.hours')}</span>
                                <span> & </span>
                                <span>{commerce?.deliveryPreparationTime.minutes}</span>
                                <span> {translate('time.minutes')}</span>
                            </Legend>
                        </div>

                        {commerce?.serviceHours &&
                            (
                                Object.keys({
                                    pickup: commerce.serviceHours.pickup,
                                    curbside: commerce.serviceHours.curbside,
                                    delivery: commerce.serviceHours.delivery,
                                    onsite: commerce.serviceHours.onsite,
                                }) as (keyof ServiceHours)[]
                            ).map((serviceHoursKey, keyIndex) => {
                                const serviceHours = commerce.serviceHours[serviceHoursKey];

                                return (
                                    <Fragment key={keyIndex}>
                                        <ServiceHoursTable
                                            serviceHoursKey={serviceHoursKey}
                                            isEnabled={
                                                commerce.typeOrder.find(typeOrder => {
                                                    const curentTypeOrder: keyof ServiceHours =
                                                        typeOrder.type === 'dine-in' ? 'onsite' : typeOrder.type;

                                                    return curentTypeOrder === serviceHoursKey;
                                                })?.enabled ?? false
                                            }
                                            serviceHours={serviceHours}
                                        />
                                    </Fragment>
                                );
                            })}
                    </div>
                </section>
            </div>
        </ScrollLayout>
    );
};

export default memo(CommerceInfo);
