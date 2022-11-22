/* react */
import { memo } from 'react';
/* context */
import { useCreateCommerceContext } from '../CreateCommerce.context';
/* custom hook */
import { useCreateCommerceAttention } from './useCreateCommerceAttention.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <ScrollLayout orientation="col">
            <div className={styles.Attention}>
                <div className={styles.Content}>
                    <div>
                        <div className={styles.AttentionHeader}>
                            <h3 title={translate('createcommerce.onsite')}>
                                <Legend hasDots justify="center">
                                    {translate('createcommerce.onsite')}
                                </Legend>
                            </h3>

                            <Button
                                type="button"
                                className={ButtonStyles.FillSecondary}
                                onClick={() => handleRepeatSunday('onsite')}>
                                <Legend hasDots justify="center">
                                    {translate('actions.repeatweekday')}
                                </Legend>
                            </Button>
                        </div>

                        <div className={styles.ServiceHours}>
                            {createCommerceAttentionServiceHoursOnsiteFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>

                        <h3 title={translate('createcommerce.onsitepreparation')}>
                            <Legend hasDots>{translate('createcommerce.onsitepreparation')}</Legend>
                        </h3>

                        <div className={styles.PreparationTime}>
                            {createCommerceAttentionOnsitePreparationTimeFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className={styles.AttentionHeader}>
                            <h3 title={translate('createcommerce.delivery')}>
                                <Legend hasDots justify="center">
                                    {translate('createcommerce.delivery')}
                                </Legend>
                            </h3>

                            <Button
                                type="button"
                                className={ButtonStyles.FillSecondary}
                                onClick={() => handleRepeatSunday('delivery')}>
                                <Legend hasDots justify="center">
                                    {translate('actions.repeatweekday')}
                                </Legend>
                            </Button>
                        </div>

                        <div className={styles.ServiceHours}>
                            {createCommerceAttentionServiceHoursDeliveryFormFields.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>

                        <h3 title={translate('createcommerce.deliverypreparation')}>
                            <Legend hasDots>{translate('createcommerce.deliverypreparation')}</Legend>
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
                        title={translate('actions.prevstep')}
                        onClick={handlePrevTab}>
                        <Legend hasDots justify="center">
                            {translate('actions.prevstep')}
                        </Legend>
                    </Button>

                    <Button type="submit" className={ButtonStyles.FillSecondary} title={translate('actions.save')}>
                        <Legend hasDots justify="center">
                            {translate('actions.save')}
                        </Legend>
                    </Button>
                </div>
            </div>
        </ScrollLayout>
    );
};

export default memo(CreateCommerceAttention);
