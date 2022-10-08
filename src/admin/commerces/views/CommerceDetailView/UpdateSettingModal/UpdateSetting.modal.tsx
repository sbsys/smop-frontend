/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateSetting } from './useUpdateSetting.hook';
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
import styles from './UpdateSetting.module.scss';

const UpdateSettingModal = () => {
    const {
        /* states */
        isUpdateSetting,
        hideUpdateSetting,
    } = useCommerceDetailContext();

    const { handleUpdateSetting, handleResetUpdateSettingForm, updateSettingFormFields } = useUpdateSetting();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateSetting} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateSetting}>
                <form onSubmit={handleUpdateSetting}>
                    <div className={styles.Header} title={t('views.commercedetail.updatesetting.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.commercedetail.updatesetting.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateSettingFormFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.commercedetail.updatesetting.actions.cancel')}
                            onClick={() => {
                                handleResetUpdateSettingForm();

                                hideUpdateSetting();
                            }}>
                            <Legend hasDots justify="center">
                                {t('views.commercedetail.updatesetting.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.commercedetail.updatesetting.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.commercedetail.updatesetting.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateSettingModal);
