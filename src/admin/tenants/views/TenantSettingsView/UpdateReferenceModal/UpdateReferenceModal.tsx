/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateReference } from './useUpdateReference.hook';
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
import styles from './UpdateReferenceModal.module.scss';

const UpdateReferenceModal = () => {
    const {
        /* states */
        isUpdateReference,
        hideUpdateReference,
    } = useTenantSettingsContext();

    const { handleUpdateReference, updateReferenceFormFields, handleResetUpdateReferenceForm } = useUpdateReference();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateReference} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateReference}>
                <form onSubmit={handleUpdateReference}>
                    <div className={styles.Header} title={translate('orgedit.references')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('orgedit.references')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateReferenceFormFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={() => {
                                handleResetUpdateReferenceForm();

                                hideUpdateReference();
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

export default memo(UpdateReferenceModal);
