/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* custom hook */
import { useUpdateBranding } from './useUpdateBranding.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateBrandingModal.module.scss';

const UpdateBrandingModal = () => {
    const {
        /* props */
        isUpdateBranding,
        hideUpdateBranding,
    } = useTenantSettingsContext();

    const { updateBrandingFormFields, handleUpdateBranding } = useUpdateBranding();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateBranding} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateBranding}>
                <form onSubmit={handleUpdateBranding}>
                    <div className={styles.Header} title={t('views.updatebranding.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.updatebranding.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateBrandingFormFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.updatebranding.actions.cancel')}
                            onClick={hideUpdateBranding}>
                            <Legend hasDots justify="center">
                                {t('views.updatebranding.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.updatebranding.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.updatebranding.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateBrandingModal);
