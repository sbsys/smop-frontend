/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateAddonTitleState } from './useUpdateAddonTitleState.hook';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
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
import styles from './UpdateAddonTitleState.module.scss';

const UpdateAddonTitleStateModal = () => {
    const {
        /* states */
        selectedTitleToUpdateState,
    } = useAddonsTitleListContext();

    const { handleCancelUpdateStateAddonTitle, handleUpdateStateAddonTitle } = useUpdateAddonTitleState();

    const { translate, lang } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedTitleToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={translate('addontitlelist.updatestatus')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('addontitlelist.updatestatus')}</Legend>
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
                            onClick={handleCancelUpdateStateAddonTitle}>
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
                            onClick={handleUpdateStateAddonTitle}>
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

export default memo(UpdateAddonTitleStateModal);
