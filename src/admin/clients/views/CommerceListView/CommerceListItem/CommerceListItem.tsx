/* react */
import { FC, memo, useMemo } from 'react';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useClientsLang } from 'admin/core';
/* utils */
import { amountFormat, classNames } from 'shared/utils';
/* types */
import { CommerceListItem as CommerceListItemType } from 'admin/clients/types';
/* styles */
import styles from './CommerceListItem.module.scss';

const CommerceListItem: FC<CommerceListItemType> = ({
    referenceName,
    orderOnline,
    typeCharge,
    address,
    servicePhones,
}) => {
    const { translate } = useClientsLang();

    const currentCharge = useMemo(() => typeCharge.find(charge => charge.enabled), [typeCharge]);

    const currentServicePhone = useMemo(() => servicePhones[0], [servicePhones]);

    return (
        <div className={styles.ListItem}>
            <div className={styles.Header}>
                <h2 title={referenceName}>
                    <Legend hasDots justify="center">
                        {referenceName}
                    </Legend>
                </h2>

                <Legend
                    hasDots
                    className={classNames(styles.Title, orderOnline ? styles.Online : styles.Offline)}
                    justify="center">
                    {translate(`commons.${orderOnline ? 'online' : 'offline'}`)}
                </Legend>
            </div>

            <div className={styles.Content}>
                <Legend hasDots>
                    <span>{translate('commons.shipment')} </span>

                    <span className={styles.Title}>
                        {currentCharge?.type === 'amount' && <span>$ </span>}

                        <span>{amountFormat(currentCharge?.value ?? 0, 2)}</span>

                        {currentCharge?.type === 'percentage' && <span>%</span>}
                    </span>
                </Legend>

                <Legend title={address} className={styles.Address}>
                    <span className={styles.Title}>{translate('commons.address')}: </span>

                    <span>{address}</span>
                </Legend>
            </div>

            <div className={styles.Footer}>
                <Legend justify="center" hasDots>
                    <span className={styles.Title}>{translate('commons.phone')}: </span>

                    <span>{currentServicePhone.phone}</span>
                </Legend>
            </div>
        </div>
    );
};

export default memo(CommerceListItem);
