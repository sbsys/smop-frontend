/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateAddonTitle } from './useUpdateAddonTitle.hook';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
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

    const { t } = useTranslation();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdate !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateAddonTitle}>
                <form onSubmit={handleUpdateAddonTitle}>
                    <div className={styles.Header} title={t('views.addontitlelist.update.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.addontitlelist.update.title')}</Legend>
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
                            title={t('views.addontitlelist.update.actions.cancel')}
                            onClick={handleCancelUpdateAddonTitle}>
                            <Legend hasDots justify="center">
                                {t('views.addontitlelist.update.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.addontitlelist.update.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.addontitlelist.update.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateAddonTitleModal);
