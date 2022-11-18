/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateUserState } from './useUpdateUserState.hook';
/* context */
import { useUserListContext } from '../UserList.context';
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
import styles from './UpdateUserState.module.scss';

const UpdateUserStateModal = () => {
    const {
        /* states */
        selectedUserToUpdateState,
    } = useUserListContext();

    const { handleCancelUpdateUserState, handleUpdateUserState } = useUpdateUserState();

    const { translate } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedUserToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={translate('userlist.updatestatus')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('userlist.updatestatus')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">{selectedUserToUpdateState?.fullname}</Legend>

                        <Legend justify="center">
                            {translate(
                                `messages.${
                                    selectedUserToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateUserState}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedUserToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={translate(
                                selectedUserToUpdateState?.isActive === 'active'
                                    ? 'actions.deactivate'
                                    : 'actions.activate'
                            )}
                            onClick={handleUpdateUserState}>
                            <Legend hasDots justify="center">
                                {translate(
                                    selectedUserToUpdateState?.isActive === 'active'
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

export default memo(UpdateUserStateModal);
