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

const CommerceListItem: FC<CommerceListItemType> = ({ referenceName, orderOnline, typeCharge, address }) => {
    const { translate } = useClientsLang();

    const currentCharge = useMemo(() => typeCharge.find(charge => charge.enabled), [typeCharge]);

    return (
        <div className={styles.ListItem}>
            <div className={styles.Header}>
                <h2 title={referenceName}>
                    <Legend hasDots>{referenceName}</Legend>
                </h2>

                <Legend
                    hasDots
                    className={classNames(styles.Title, orderOnline ? styles.Online : styles.Offline)}
                    justify="center">
                    {translate(`commons.${orderOnline ? 'online' : 'offline'}`)}
                </Legend>
            </div>

            <Legend justify="end" hasDots>
                <span>{translate('commons.shipment')} </span>

                <span className={styles.Title}>
                    {currentCharge?.type === 'amount' && <span>$ </span>}

                    <span>{amountFormat(currentCharge?.value ?? 0, 2)}</span>

                    {currentCharge?.type === 'percentage' && <span>%</span>}
                </span>
            </Legend>

            <Legend title={address}>
                <span className={styles.Title}>{translate('commons.address')}: </span>

                <span>{address}</span>
            </Legend>
        </div>
    );
};

export default memo(CommerceListItem);
