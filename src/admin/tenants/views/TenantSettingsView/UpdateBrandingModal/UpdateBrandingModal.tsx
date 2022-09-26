/* react */
import { memo } from 'react';
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
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateBrandingModal.module.scss';

const UpdateBrandingModal = () => {
    const {
        /* props */
        formFields,
    } = useTenantSettingsContext();

    return (
        <ModalLayout isVisible rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateBranding}>
                <form onSubmit={event => event.preventDefault()}>
                    <div className={styles.Header}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>Update branding</Legend>
                    </div>

                    <div className={styles.Content}>
                        {formFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button type="button" className={ButtonStyles.OutlineNone}>
                            <Legend hasDots justify="center">
                                Cancel
                            </Legend>
                        </Button>

                        <Button type="submit" className={ButtonStyles.FillSecondary}>
                            <Legend hasDots justify="center">
                                Update
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateBrandingModal);
