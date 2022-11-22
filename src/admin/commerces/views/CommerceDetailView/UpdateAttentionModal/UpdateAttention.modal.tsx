/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateAttention } from './useUpdateAttention.hook';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { ModalLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
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
        handleRepeatSunday,
        updateAttentionServiceHoursOnsiteFormFields,
        updateAttentionOnsitePreparationTimeFormFields,
        updateAttentionServiceHoursDeliveryFormFields,
        updateAttentionDeliveryPreparationTimeFormFields,
    } = useUpdateAttention();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateAttention} rowAlignment="center" colAlignment="center" hasIndentation>
            <PanelLayout orientation="col" className={styles.UpdateAttention}>
                <form onSubmit={handleUpdateAttention}>
                    <div className={styles.Header} title={translate('commerceedit.attention')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('commerceedit.attention')}</Legend>
                    </div>

                    <ScrollLayout orientation="col">
                        <div className={styles.Content}>
                            <div>
                                <div className={styles.ContentHeader}>
                                    <h3 title={translate('commerceedit.onsite')}>
                                        <Legend hasDots justify="center">
                                            {translate('commerceedit.onsite')}
                                        </Legend>
                                    </h3>

                                    <Button
                                        type="button"
                                        className={ButtonStyles.FillSecondary}
                                        onClick={() => handleRepeatSunday('onsite')}
                                        title={translate('actions.repeatweekday')}>
                                        <Legend hasDots justify="center">
                                            {translate('actions.repeatweekday')}
                                        </Legend>
                                    </Button>
                                </div>

                                <div className={styles.ServiceHours}>
                                    {updateAttentionServiceHoursOnsiteFormFields.map((field, index) => (
                                        <FieldSet {...field} key={`onsite_${index}`} />
                                    ))}
                                </div>

                                <h3 title={translate('commerceedit.onsitepreparation')}>
                                    <Legend hasDots>{translate('commerceedit.onsitepreparation')}</Legend>
                                </h3>

                                <div className={styles.PreparationTime}>
                                    {updateAttentionOnsitePreparationTimeFormFields.map((field, index) => (
                                        <FieldSet {...field} key={index} />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className={styles.ContentHeader}>
                                    <h3 title={translate('commerceedit.delivery')}>
                                        <Legend hasDots justify="center">
                                            {translate('commerceedit.delivery')}
                                        </Legend>
                                    </h3>

                                    <Button
                                        type="button"
                                        className={ButtonStyles.FillSecondary}
                                        onClick={() => handleRepeatSunday('delivery')}
                                        title={translate('actions.repeatweekday')}>
                                        <Legend hasDots justify="center">
                                            {translate('actions.repeatweekday')}
                                        </Legend>
                                    </Button>
                                </div>

                                <div className={styles.ServiceHours}>
                                    {updateAttentionServiceHoursDeliveryFormFields.map((field, index) => (
                                        <FieldSet {...field} key={`delivery_${index}`} />
                                    ))}
                                </div>

                                <h3 title={translate('commerceedit.deliverypreparation')}>
                                    <Legend hasDots>{translate('commerceedit.deliverypreparation')}</Legend>
                                </h3>

                                <div className={styles.PreparationTime}>
                                    {updateAttentionDeliveryPreparationTimeFormFields.map((field, index) => (
                                        <FieldSet {...field} key={index} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollLayout>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={() => {
                                handleResetUpdateAttentionForm();

                                hideUpdateAttention();
                            }}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={translate('actions.update')}>
                            <Legend hasDots justify="center">
                                {translate('actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </PanelLayout>
        </ModalLayout>
    );
};

export default memo(UpdateAttentionModal);
