/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateMainTitleState } from './useUpdateMainTitleState.hook';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate, lang } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={translate('maintitlelist.updatestatus')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('maintitlelist.updatestatus')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">
                            {selectedTitleToUpdateState?.titleCollection.find(collection => collection.lang === lang)
                                ?.ref ?? selectedTitleToUpdateState?.defaultTitle}
                        </Legend>

                        <Legend justify="center">
                            {translate(
                                `messages.${
                                    selectedTitleToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateStateMainTitle}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedTitleToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={translate(
                                selectedTitleToUpdateState?.isActive === 'active'
                                    ? 'actions.deactivate'
                                    : 'actions.activate'
                            )}
                            onClick={handleUpdateStateMainTitle}>
                            <Legend hasDots justify="center">
                                {translate(
                                    selectedTitleToUpdateState?.isActive === 'active'
                                        ? 'actions.deactivate'
                                        : 'actions.activate'
                                )}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateMainTitleStateModal);
