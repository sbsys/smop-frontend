/* react */
import { FC, memo, useMemo } from 'react';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useClientsLang } from 'admin/core';
/* types */
import { CommerceListItem as CommerceListItemType } from 'admin/clients/types';
/* styles */
import styles from './CommerceListItem.module.scss';

const CommerceListItem: FC<CommerceListItemType> = ({ referenceName, typeCharge, address, servicePhones, url }) => {
    const { translate } = useClientsLang();

    const currentServicePhone = useMemo(() => servicePhones[0], [servicePhones]);

    return (
        <div className={styles.ListItem}>
            <img src={url} alt={referenceName} crossOrigin="anonymous" />

            <h2 title={referenceName}>
                <Legend hasDots justify="center">
                    {referenceName}
                </Legend>
            </h2>

            <Legend justify="center">
                <span className={styles.Title}>{translate('commons.phone')}: </span>

                <span>{currentServicePhone.phone}</span>
            </Legend>
        </div>
    );
};

export default memo(CommerceListItem);
