/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateSettings } from './useUpdateSettings.hook';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import styles from './UpdateSettingsModal.module.scss';
import { ButtonStyles } from 'shared/styles';

const UpdateSettingsModal = () => {
    const {
        /* states */
        isUpdateSettings,
        hideUpdateSettings,
    } = useTenantSettingsContext();

    const { handleUpdateSettings, handleResetUpdateSettingsForm, updateSettingsFormFields } = useUpdateSettings();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateSettings} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateSettings}>
                <form onSubmit={handleUpdateSettings}>
                    <div className={styles.Header} title={t('views.updatesettings.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.updatesettings.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateSettingsFormFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.Languages}></div>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.updatesettings.actions.cancel')}
                            onClick={() => {
                                handleResetUpdateSettingsForm();

                                hideUpdateSettings();
                            }}>
                            <Legend hasDots justify="center">
                                {t('views.updatesettings.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.updatesettings.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.updatesettings.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateSettingsModal);
