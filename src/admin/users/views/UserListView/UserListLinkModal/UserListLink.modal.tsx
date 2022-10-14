/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useUserListContext } from '../UserList.context';
/* custom hook */
import { useUserListLinkModal } from './useUserListLinkModal.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
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

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={selectedUserToLink !== null} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.Link}>
                <form onSubmit={handleUpdateLink}>
                    <div className={styles.Header} title={t('views.userlist.link.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.userlist.link.title')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend hasDots>
                            <span className={styles.Title}>{t('views.userlist.link.name')}: </span>

                            <span>{selectedUserToLink?.fullname}</span>
                        </Legend>

                        <Legend hasDots>
                            <span className={styles.Title}>{t('views.userlist.link.email')}: </span>

                            <span>{selectedUserToLink?.email}</span>
                        </Legend>

                        <Legend hasDots>
                            <span className={styles.Title}>{t('views.userlist.link.phone')}: </span>

                            <span>{selectedUserToLink?.phoneNumber}</span>
                        </Legend>

                        <Legend hasDots>
                            <span className={styles.Title}>{t('views.userlist.link.created')}: </span>

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
                            title={t('views.userlist.link.unlink')}>
                            <Legend hasDots>{t('views.userlist.link.unlink')}</Legend>

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
                            title={t('views.userlist.link.actions.cancel')}
                            onClick={handleCancelUpdateLink}>
                            <Legend hasDots justify="center">
                                {t('views.userlist.link.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.userlist.link.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.userlist.link.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UserListLinkModal);
