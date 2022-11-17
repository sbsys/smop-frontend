/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateSettings } from './useUpdateSettings.hook';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateSettingsModal.module.scss';

const UpdateSettingsModal = () => {
    const {
        /* states */
        isUpdateSettings,
        hideUpdateSettings,
    } = useTenantSettingsContext();

    const { handleUpdateSettings, handleResetUpdateSettingsForm, updateSettingsFormFields } = useUpdateSettings();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateSettings} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateSettings}>
                <form onSubmit={handleUpdateSettings}>
                    <div className={styles.Header} title={translate('orgedit.settings')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('orgedit.settings')}</Legend>
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
                            title={translate('actions.cancel')}
                            onClick={() => {
                                handleResetUpdateSettingsForm();

                                hideUpdateSettings();
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
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateSettingsModal);
