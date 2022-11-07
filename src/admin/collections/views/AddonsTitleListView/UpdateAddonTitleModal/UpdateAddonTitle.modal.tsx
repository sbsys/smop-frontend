/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateAddonTitle } from './useUpdateAddonTitle.hook';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateAddonTitle.module.scss';

const UpdateAddonTitleModal = () => {
    const {
        /* states */
        selectedTitleToUpdate,
    } = useAddonsTitleListContext();

    const { handleCancelUpdateAddonTitle, handleUpdateAddonTitle, UpdateAddonTitleFieldProps } = useUpdateAddonTitle();

    const { translate } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdate !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateAddonTitle}>
                <form onSubmit={handleUpdateAddonTitle}>
                    <div className={styles.Header} title={translate('addontitleedit.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('addontitleedit.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {UpdateAddonTitleFieldProps.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateAddonTitle}>
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

export default memo(UpdateAddonTitleModal);
