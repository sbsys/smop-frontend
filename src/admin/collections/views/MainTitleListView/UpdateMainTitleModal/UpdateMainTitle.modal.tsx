/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateMainTitle } from './useUpdateMainTitle.hook';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateMainTitle.module.scss';

const UpdateMainTitleModal = () => {
    const {
        /* states */
        selectedTitleToUpdate,
    } = useMainTitleListContext();

    const { handleCancelUpdateMainTitle, handleUpdateMainTitle, UpdateMainTitleFieldProps } = useUpdateMainTitle();

    const { t } = useTranslation();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdate !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateMainTitle}>
                <form onSubmit={handleUpdateMainTitle}>
                    <div className={styles.Header} title={t('views.maintitlelist.update.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.maintitlelist.update.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {UpdateMainTitleFieldProps.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.maintitlelist.update.actions.cancel')}
                            onClick={handleCancelUpdateMainTitle}>
                            <Legend hasDots justify="center">
                                {t('views.maintitlelist.update.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.maintitlelist.update.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.maintitlelist.update.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateMainTitleModal);
