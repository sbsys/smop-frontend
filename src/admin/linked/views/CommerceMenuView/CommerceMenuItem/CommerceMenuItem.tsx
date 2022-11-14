/* react */
import { FC, memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CommerceMenuActions } from '../CommerceMenuActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
import { useAdminLang } from 'admin/core';
/* types */
import { MenuLinkedListItemDTO } from 'admin/linked/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './CommerceMenuItem.module.scss';

const CommerceMenuItem: FC<MenuLinkedListItemDTO> = ({
    titleId,
    defaultTitle,
    numberMenuItems,
    numberGenericItems,
}) => {
    const { translate } = useAdminLang();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <div className={styles.ListItem}>
            <div className={styles.Title}>
                <h4>
                    <Legend hasDots title={defaultTitle}>
                        {defaultTitle}
                    </Legend>
                </h4>

                <Legend hasDots title={`${numberMenuItems}/${numberGenericItems}`}>
                    {`${numberMenuItems}/${numberGenericItems}`}
                </Legend>
            </div>

            <DropLayout
                isDrop={isDropMore}
                dropCol="center"
                dropRow="end"
                anchorCol="center"
                anchorRow="end"
                drop={
                    <div className={styles.DropContainer} ref={ref}>
                        <CommerceMenuActions titleId={titleId} />
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

export default memo(CommerceMenuItem);
