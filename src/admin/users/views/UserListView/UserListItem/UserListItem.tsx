/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { UserListState } from '../UserListState';
import { UserListActions } from '../UserListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
/* utils */
import { format } from 'date-fns';
/* types */
import { UserListItemDTO } from 'admin/users/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './UserListItem.module.scss';

const UserListItem: FC<UserListItemDTO> = ({ id, fullname, profileName, createdAt, isActive }) => {
    const { t } = useTranslation();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <div className={styles.ListItem}>
            <div className={styles.Title}>
                <h4>
                    <Legend hasDots title={fullname}>
                        {fullname}
                    </Legend>
                </h4>

                <Legend hasDots title={format(createdAt, 'MMM do, yyyy')}>
                    <span>{t(`profiles.${profileName}`)}</span> - {format(createdAt, 'MMM do, yyyy')}
                </Legend>
            </div>

            <UserListState state={isActive} />

            <DropLayout
                isDrop={isDropMore}
                dropCol="center"
                dropRow="end"
                anchorCol="center"
                anchorRow="end"
                drop={
                    <div className={styles.DropContainer} ref={ref}>
                        <UserListActions state={isActive} userId={id} />
                    </div>
                }>
                <Button className={styles.DropAction} onClick={showDropMore} title={t('views.userlist.list.more')}>
                    <i>
                        <MdMoreVert />
                    </i>
                </Button>
            </DropLayout>
        </div>
    );
};

export default memo(UserListItem);
