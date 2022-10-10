/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useCreateCommerceAttention } from './useCreateCommerceAttention.hook';
/* components */
import { Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import styles from './CreateCommerceAttention.module.scss';

const CreateCommerceAttention = () => {
    const {
        createCommerceAttentionServiceHoursOnsiteFormFields,
        createCommerceAttentionOnsitePreparationTimeFormFields,
        createCommerceAttentionServiceHoursDeliveryFormFields,
        createCommerceAttentionDeliveryPreparationTimeFormFields,
    } = useCreateCommerceAttention();

    const { t } = useTranslation();

    return (
        <div className={styles.Attention}>
            <h2 title={t('views.createcommerce.attention.header')}>
                <Legend hasDots>{t('views.createcommerce.attention.header')}</Legend>
            </h2>

            <div className={styles.Content}>
                <h3 title={t('views.createcommerce.attention.servicehours.onsite')}>
                    <Legend hasDots>{t('views.createcommerce.attention.servicehours.onsite')}</Legend>
                </h3>

                <div className={styles.ServiceHours}>
                    {createCommerceAttentionServiceHoursOnsiteFormFields.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}
                </div>

                <h3 title={t('views.createcommerce.attention.servicehours.onsitepreparationtime')}>
                    <Legend hasDots>{t('views.createcommerce.attention.servicehours.onsitepreparationtime')}</Legend>
                </h3>

                <div className={styles.PreparationTime}>
                    {createCommerceAttentionOnsitePreparationTimeFormFields.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}
                </div>

                <h3 title={t('views.createcommerce.attention.servicehours.delivery')}>
                    <Legend hasDots>{t('views.createcommerce.attention.servicehours.delivery')}</Legend>
                </h3>

                <div className={styles.ServiceHours}>
                    {createCommerceAttentionServiceHoursDeliveryFormFields.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}
                </div>

                <h3 title={t('views.createcommerce.attention.servicehours.deliverypreparationtime')}>
                    <Legend hasDots>{t('views.createcommerce.attention.servicehours.deliverypreparationtime')}</Legend>
                </h3>

                <div className={styles.PreparationTime}>
                    {createCommerceAttentionDeliveryPreparationTimeFormFields.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(CreateCommerceAttention);
