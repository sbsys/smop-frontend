/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateAddonTitleState } from './useUpdateAddonTitleState.hook';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateAddonTitleState.module.scss';

const UpdateAddonTitleStateModal = () => {
    const {
        /* states */
        selectedTitleToUpdateState,
    } = useAddonsTitleListContext();

    const { handleCancelUpdateStateAddonTitle, handleUpdateStateAddonTitle } = useUpdateAddonTitleState();

    const { t, i18n } = useTranslation();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={t('views.addontitlelist.updatestate.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.addontitlelist.updatestate.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">
                            {selectedTitleToUpdateState?.titleCollection.find(
                                collection => collection.lang === i18n.language
                            )?.ref ?? selectedTitleToUpdateState?.defaultTitle}
                        </Legend>

                        <Legend justify="center">
                            {t(
                                `views.addontitlelist.updatestate.${
                                    selectedTitleToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.addontitlelist.updatestate.actions.cancel')}
                            onClick={handleCancelUpdateStateAddonTitle}>
                            <Legend hasDots justify="center">
                                {t('views.addontitlelist.updatestate.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedTitleToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={t('views.addontitlelist.updatestate.actions.update')}
                            onClick={handleUpdateStateAddonTitle}>
                            <Legend hasDots justify="center">
                                {t('views.addontitlelist.updatestate.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateAddonTitleStateModal);
