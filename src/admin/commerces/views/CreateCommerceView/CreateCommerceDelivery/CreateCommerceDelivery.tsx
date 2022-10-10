/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useCreateCommerceDelivery } from './useCreateCommerceDelivery.hook';
/* components */
import { Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import styles from './CreateCommerceDelivery.module.scss';

const CreateCommerceDelivery = () => {
    const { createCommerceDeliveryFields } = useCreateCommerceDelivery();

    const { t } = useTranslation();

    return (
        <div className={styles.Delivery}>
            <h2 title={t('views.createcommerce.delivery.header')}>
                <Legend hasDots>{t('views.createcommerce.delivery.header')}</Legend>
            </h2>

            <div className={styles.Content}>
                {createCommerceDeliveryFields.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}
            </div>
        </div>
    );
};

export default memo(CreateCommerceDelivery);
