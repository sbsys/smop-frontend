/* react */
import { FC, memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CommerceListState } from '../CommerceListState';
import { CommerceListActions } from '../CommerceListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* types */
import { CommerceListItemDTO } from 'admin/commerces/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './CommerceListItem.module.scss';

const CommerceListItem: FC<CommerceListItemDTO> = ({ id, name, createdAt, isActive }) => {
    const { translate } = useAdminLang();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <div className={styles.ListItem}>
            <div className={styles.Title}>
                <h4>
                    <Legend hasDots title={name}>
                        {name}
                    </Legend>
                </h4>

                <Legend hasDots title={format(createdAt, 'MMM do, yyyy')}>
                    {format(createdAt, 'MMM do, yyyy')}
                </Legend>
            </div>

            <CommerceListState state={isActive} />

            <DropLayout
                isDrop={isDropMore}
                dropCol="center"
                dropRow="end"
                anchorCol="center"
                anchorRow="end"
                drop={
                    <div className={styles.DropContainer} ref={ref}>
                        <CommerceListActions state={isActive} commerceId={id} />
                    </div>
                }>
                <Button className={styles.DropAction} onClick={showDropMore} title={translate('actions.more')}>
                    <i>
                        <MdMoreVert />
                    </i>
                </Button>
            </DropLayout>
        </div>
    );
};

export default memo(CommerceListItem);
