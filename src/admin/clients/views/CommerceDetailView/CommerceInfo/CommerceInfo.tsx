/* react */
import { memo, useCallback, useMemo, useState } from 'react';
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { AccordionLayout, ScrollLayout, TableLayout } from 'shared/layouts';
/* components */
import { Button, DraggableMarker, Legend } from 'shared/components';
/* hooks */
import { useClientsLang } from 'admin/core';
/* utils */
import { amountFormat, classNames, milesToMeters } from 'shared/utils';
/* types */
import { ServiceHours } from 'admin/clients/types';
/* assets */
import { MdArrowDropDown, MdArrowDropUp, MdCheckCircle, MdStore } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
/* styles */
import styles from './CommerceInfo.module.scss';

const CommerceInfo = () => {
    const {
        /* states */
        commerce,
    } = useCommerceDetailContext();

    const meters = useMemo(() => milesToMeters(commerce?.deliveryArea ?? 0), [commerce?.deliveryArea]);

    const [isAttentionOpened, setAttentionOpened] = useState<Record<keyof ServiceHours, boolean>>({
        pickup: false,
        curbside: false,
        delivery: false,
        onsite: false,
    });

    const handleToggleAttention = useCallback(
        (key: keyof ServiceHours) => () => {
            setAttentionOpened(prev => {
                const aux = { ...prev };
                aux[key] = !aux[key];

                return aux;
            });
        },
        []
    );

    const { translate } = useClientsLang();

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
                                zoom={10}
                                scrollWheelZoom={false}
                                className={styles.Map}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                <DraggableMarker
                                    isDraggable={false}
                                    lat={commerce?.geolocation.latitude ?? 40}
                                    lng={commerce?.geolocation.longitude ?? -100}
                                    getPosition={() => {}}
                                    icon={<MdStore />}
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

                        {commerce?.serviceHours &&
                            (
                                Object.keys({
                                    pickup: commerce.serviceHours.pickup,
                                    curbside: commerce.serviceHours.curbside,
                                    delivery: commerce.serviceHours.delivery,
                                    onsite: commerce.serviceHours.onsite,
                                }) as (keyof ServiceHours)[]
                            ).map((key, keyIndex) => {
                                const serviceHours = commerce.serviceHours[key];

                                return (
                                    <AccordionLayout
                                        key={keyIndex}
                                        className={classNames(styles.Accordion, styles.AccordionActive)}
                                        isAccordion={isAttentionOpened[key]}
                                        accordion={serviceHours.map((serviceHour, serviceIndex) => (
                                            <div key={serviceIndex}>
                                                <TableLayout
                                                    header={{
                                                        columns: [
                                                            {
                                                                children: (
                                                                    <Legend
                                                                        hasDots
                                                                        title={translate(`day.${serviceHour.key}`)}>
                                                                        {translate(`day.${serviceHour.key}`)}
                                                                    </Legend>
                                                                ),
                                                                span: 2,
                                                            },
                                                        ],
                                                    }}
                                                    body={serviceHour.schedules.map(schedule => ({
                                                        columns: [
                                                            {
                                                                children: (
                                                                    <Legend
                                                                        justify="center"
                                                                        hasDots
                                                                        title={schedule.opening}>
                                                                        {schedule.opening}
                                                                    </Legend>
                                                                ),
                                                                span: 1,
                                                            },
                                                            {
                                                                children: (
                                                                    <Legend
                                                                        justify="center"
                                                                        hasDots
                                                                        title={schedule.closing}>
                                                                        {schedule.closing}
                                                                    </Legend>
                                                                ),
                                                                span: 1,
                                                            },
                                                        ],
                                                    }))}
                                                />
                                            </div>
                                        ))}>
                                        <div className={styles.OrderOnline} title={translate(`commercedetail.${key}`)}>
                                            <Legend
                                                className={styles.Title}
                                                hasDots
                                                title={translate(`commercedetail.${key}`)}>
                                                {translate(`commercedetail.${key}`)}
                                            </Legend>

                                            <i
                                                className={classNames(
                                                    isAttentionOpened[key] ? styles.Online : styles.Offline
                                                )}>
                                                {isAttentionOpened[key] ? <MdCheckCircle /> : <IoMdCloseCircle />}
                                            </i>

                                            <Button
                                                className={styles.AccordionControl}
                                                onClick={handleToggleAttention(key)}>
                                                <i>
                                                    {isAttentionOpened[key] ? <MdArrowDropUp /> : <MdArrowDropDown />}
                                                </i>
                                            </Button>
                                        </div>
                                    </AccordionLayout>
                                );
                            })}
                    </div>
                </section>
            </div>
        </ScrollLayout>
    );
};

export default memo(CommerceInfo);
