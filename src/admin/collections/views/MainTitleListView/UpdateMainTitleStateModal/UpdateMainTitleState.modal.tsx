/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateMainTitleState } from './useUpdateMainTitleState.hook';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateMainTitleState.module.scss';

const UpdateMainTitleStateModal = () => {
    const {
        /* states */
        selectedTitleToUpdateState,
    } = useMainTitleListContext();

    const { handleCancelUpdateStateMainTitle, handleUpdateStateMainTitle } = useUpdateMainTitleState();

    const { t, i18n } = useTranslation();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={t('views.maintitlelist.updatestate.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.maintitlelist.updatestate.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">
                            {selectedTitleToUpdateState?.titleCollection.find(
                                collection => collection.lang === i18n.language
                            )?.ref ?? selectedTitleToUpdateState?.defaultTitle}
                        </Legend>

                        <Legend justify="center">
                            {t(
                                `views.maintitlelist.updatestate.${
                                    selectedTitleToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.maintitlelist.updatestate.actions.cancel')}
                            onClick={handleCancelUpdateStateMainTitle}>
                            <Legend hasDots justify="center">
                                {t('views.maintitlelist.updatestate.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedTitleToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={t('views.maintitlelist.updatestate.actions.update')}
                            onClick={handleUpdateStateMainTitle}>
                            <Legend hasDots justify="center">
                                {t('views.maintitlelist.updatestate.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateMainTitleStateModal);
