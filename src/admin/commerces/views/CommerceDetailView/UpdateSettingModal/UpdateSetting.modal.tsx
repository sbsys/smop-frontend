/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateSetting } from './useUpdateSetting.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateSetting.module.scss';

const UpdateSettingModal = () => {
    const { isUpdateSetting, handleCancelUpdateSetting, handleUpdateSetting, updateSettingFormFields } =
        useUpdateSetting();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateSetting} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateSetting}>
                <form onSubmit={handleUpdateSetting}>
                    <div className={styles.Header} title={translate('commercedetail.settings')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('commercedetail.settings')}</Legend>
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
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateSetting}>
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

export default memo(UpdateSettingModal);
