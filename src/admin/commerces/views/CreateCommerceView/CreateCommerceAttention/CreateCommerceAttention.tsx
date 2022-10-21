/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* custom hook */
import { useCreateCommerceAttention } from './useCreateCommerceAttention.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateCommerceAttention.module.scss';

const CreateCommerceAttention = () => {
    const {
        /* functions */
        handlePrevTab,
    } = useCreateCommerceContext();

    const {
        createCommerceAttentionServiceHoursOnsiteFormFields,
        createCommerceAttentionOnsitePreparationTimeFormFields,
        createCommerceAttentionServiceHoursDeliveryFormFields,
        createCommerceAttentionDeliveryPreparationTimeFormFields,
        handleRepeatSunday,
    } = useCreateCommerceAttention();

    const { t } = useTranslation();

    return (
        <ScrollLayout orientation="col">
            <div className={styles.Attention}>
                <div className={styles.Content}>
                    <div>
                        <div className={styles.AttentionHeader}>
                            <h3 title={t('views.createcommerce.attention.servicehours.onsite')}>
                                <Legend hasDots>{t('views.createcommerce.attention.servicehours.onsite')}</Legend>
                            </h3>

                            <Button
                                type="button"
                                className={ButtonStyles.FillSecondary}
                                onClick={() => handleRepeatSunday('onsite')}>
                                <Legend hasDots>{t('views.createcommerce.attention.servicehours.onsiterepeat')}</Legend>
                            </Button>
                        </div>

                        <div className={styles.ServiceHours}>
                            {createCommerceAttentionServiceHoursOnsiteFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>

                        <h3 title={t('views.createcommerce.attention.servicehours.onsitepreparationtime')}>
                            <Legend hasDots>
                                {t('views.createcommerce.attention.servicehours.onsitepreparationtime')}
                            </Legend>
                        </h3>

                        <div className={styles.PreparationTime}>
                            {createCommerceAttentionOnsitePreparationTimeFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className={styles.AttentionHeader}>
                            <h3 title={t('views.createcommerce.attention.servicehours.delivery')}>
                                <Legend hasDots>{t('views.createcommerce.attention.servicehours.delivery')}</Legend>
                            </h3>

                            <Button
                                type="button"
                                className={ButtonStyles.FillSecondary}
                                onClick={() => handleRepeatSunday('delivery')}>
                                <Legend hasDots>
                                    {t('views.createcommerce.attention.servicehours.deliveryrepeat')}
                                </Legend>
                            </Button>
                        </div>

                        <div className={styles.ServiceHours}>
                            {createCommerceAttentionServiceHoursDeliveryFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>

                        <h3 title={t('views.createcommerce.attention.servicehours.deliverypreparationtime')}>
                            <Legend hasDots>
                                {t('views.createcommerce.attention.servicehours.deliverypreparationtime')}
                            </Legend>
                        </h3>

                        <div className={styles.PreparationTime}>
                            {createCommerceAttentionDeliveryPreparationTimeFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.OutlineNone}
                        title={t('actions.prevstep')}
                        onClick={handlePrevTab}>
                        <Legend hasDots justify="center">
                            {t('actions.prevstep')}
                        </Legend>
                    </Button>

                    <Button
                        type="submit"
                        className={ButtonStyles.FillSecondary}
                        title={t('views.createcommerce.actions.save')}>
                        <Legend hasDots justify="center">
                            {t('views.createcommerce.actions.save')}
                        </Legend>
                    </Button>
                </div>
            </div>
        </ScrollLayout>
    );
};

export default memo(CreateCommerceAttention);
