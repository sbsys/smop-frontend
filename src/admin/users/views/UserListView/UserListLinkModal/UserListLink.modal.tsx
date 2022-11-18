/* react */
import { memo } from 'react';
/* context */
import { useUserListContext } from '../UserList.context';
/* custom hook */
import { useUserListLinkModal } from './useUserListLinkModal.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* utils */
import { format, isDate } from 'date-fns';
import { classNames } from 'shared/utils';
/* assets */
import { MdLinkOff, MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UserListLinkModal.module.scss';

const UserListLinkModal = () => {
    const {
        /* states */
        selectedUserToLink,
    } = useUserListContext();

    const { handleUpdateLink, handleCancelUpdateLink, handleUnlink, updateUserLinkFieldProps } = useUserListLinkModal();

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={selectedUserToLink !== null} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.Link}>
                <form onSubmit={handleUpdateLink}>
                    <div className={styles.Header} title={translate('userlink.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('userlink.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend hasDots>
                            <span className={styles.Title}>{translate('userlink.name')}: </span>

                            <span>{selectedUserToLink?.fullname}</span>
                        </Legend>

                        <Legend hasDots>
                            <span className={styles.Title}>{translate('userlink.email')}: </span>

                            <span>{selectedUserToLink?.email}</span>
                        </Legend>

                        <Legend hasDots>
                            <span className={styles.Title}>{translate('userlink.phone')}: </span>

                            <span>{selectedUserToLink?.phoneNumber}</span>
                        </Legend>

                        <Legend hasDots>
                            <span className={styles.Title}>{translate('userlink.created')}: </span>

                            <span>
                                {isDate(selectedUserToLink?.createdAt) &&
                                    format(selectedUserToLink?.createdAt as Date, 'MMM do, yyyy')}
                            </span>
                        </Legend>

                        <Button
                            className={classNames(ButtonStyles.FillWarning, styles.Unlink)}
                            type="button"
                            onClick={handleUnlink}
                            disabled={!selectedUserToLink?.commerceId && !selectedUserToLink?.profileName}
                            title={translate('userlink.unlink')}>
                            <Legend hasDots>{translate('userlink.unlink')}</Legend>

                            <i>
                                <MdLinkOff />
                            </i>
                        </Button>

                        {updateUserLinkFieldProps.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateLink}>
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

export default memo(UserListLinkModal);
