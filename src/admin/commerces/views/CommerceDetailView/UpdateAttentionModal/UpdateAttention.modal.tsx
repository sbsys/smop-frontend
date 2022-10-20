/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateAttention } from './useUpdateAttention.hook';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateAttention.module.scss';

const UpdateAttentionModal = () => {
    const {
        /* states */
        isUpdateAttention,
        hideUpdateAttention,
    } = useCommerceDetailContext();

    const {
        handleUpdateAttention,
        handleResetUpdateAttentionForm,
        updateAttentionServiceHoursOnsiteFormFields,
        updateAttentionOnsitePreparationTimeFormFields,
        updateAttentionServiceHoursDeliveryFormFields,
        updateAttentionDeliveryPreparationTimeFormFields,
    } = useUpdateAttention();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateAttention} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateAttention}>
                <form onSubmit={handleUpdateAttention}>
                    <div className={styles.Header} title={t('views.commercedetail.updateattention.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.commercedetail.updateattention.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <div>
                            <h3 title={t('views.commercedetail.updateattention.servicehours.onsite')}>
                                <Legend hasDots>{t('views.commercedetail.updateattention.servicehours.onsite')}</Legend>
                            </h3>

                            <div className={styles.ServiceHours}>
                                {updateAttentionServiceHoursOnsiteFormFields.map((field, index) => (
                                    <FieldSet {...field} key={index} />
                                ))}
                            </div>

                            <h3 title={t('views.commercedetail.updateattention.servicehours.onsitepreparationtime')}>
                                <Legend hasDots>
                                    {t('views.commercedetail.updateattention.servicehours.onsitepreparationtime')}
                                </Legend>
                            </h3>

                            <div className={styles.PreparationTime}>
                                {updateAttentionOnsitePreparationTimeFormFields.map((field, index) => (
                                    <FieldSet {...field} key={index} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 title={t('views.commercedetail.updateattention.servicehours.delivery')}>
                                <Legend hasDots>
                                    {t('views.commercedetail.updateattention.servicehours.delivery')}
                                </Legend>
                            </h3>

                            <div className={styles.ServiceHours}>
                                {updateAttentionServiceHoursDeliveryFormFields.map((field, index) => (
                                    <FieldSet {...field} key={index} />
                                ))}
                            </div>

                            <h3 title={t('views.commercedetail.updateattention.servicehours.deliverypreparationtime')}>
                                <Legend hasDots>
                                    {t('views.commercedetail.updateattention.servicehours.deliverypreparationtime')}
                                </Legend>
                            </h3>

                            <div className={styles.PreparationTime}>
                                {updateAttentionDeliveryPreparationTimeFormFields.map((field, index) => (
                                    <FieldSet {...field} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.commercedetail.updateattention.actions.cancel')}
                            onClick={() => {
                                handleResetUpdateAttentionForm();

                                hideUpdateAttention();
                            }}>
                            <Legend hasDots justify="center">
                                {t('views.commercedetail.updateattention.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.commercedetail.updateattention.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.commercedetail.updateattention.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateAttentionModal);
