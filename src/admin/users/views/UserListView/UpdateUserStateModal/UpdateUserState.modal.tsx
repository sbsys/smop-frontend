/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useUpdateUserState } from './useUpdateUserState.hook';
/* context */
import { useUserListContext } from '../UserList.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateUserState.module.scss';

const UpdateUserStateModal = () => {
    const {
        /* states */
        selectedUserToUpdateState,
    } = useUserListContext();

    const { handleCancelUpdateUserState, handleUpdateUserState } = useUpdateUserState();

    const { t } = useTranslation();

    return (
        <ModalLayout
            isVisible={selectedUserToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={t('views.userlist.updatestate.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.userlist.updatestate.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">{selectedUserToUpdateState?.fullname}</Legend>

                        <Legend justify="center">
                            {t(
                                `views.userlist.updatestate.${
                                    selectedUserToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={t('views.userlist.updatestate.actions.cancel')}
                            onClick={handleCancelUpdateUserState}>
                            <Legend hasDots justify="center">
                                {t('views.userlist.updatestate.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedUserToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={t('views.userlist.updatestate.actions.update')}
                            onClick={handleUpdateUserState}>
                            <Legend hasDots justify="center">
                                {t('views.userlist.updatestate.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateUserStateModal);
