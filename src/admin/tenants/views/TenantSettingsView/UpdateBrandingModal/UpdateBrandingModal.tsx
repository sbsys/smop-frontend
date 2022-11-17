/* react */
import { memo } from 'react';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* custom hook */
import { useUpdateBranding } from './useUpdateBranding.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
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

    const { updateBrandingFormFields, handleUpdateBranding, handleResetUpdateBrandingForm } = useUpdateBranding();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateBranding} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateBranding}>
                <form onSubmit={handleUpdateBranding}>
                    <div className={styles.Header} title={translate('orgedit.branding')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('orgedit.branding')}</Legend>
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
                            title={translate('actions.cancel')}
                            onClick={() => {
                                handleResetUpdateBrandingForm();

                                hideUpdateBranding();
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

export default memo(UpdateBrandingModal);
