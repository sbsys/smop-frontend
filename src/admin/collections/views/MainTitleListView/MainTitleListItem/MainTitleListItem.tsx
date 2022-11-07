/* react */
import { FC, memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { MainTitleListState } from '../MainTitleListState';
import { MainTitleListActions } from '../MainTitleListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* types */
import { MainTitleListItemDTO } from 'admin/collections/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './MainTitleListItem.module.scss';

const MainTitleListItem: FC<MainTitleListItemDTO> = ({
    titleId,
    defaultTitle,
    titleCollection,
    createdAt,
    isActive,
    totalProducts,
}) => {
    const { translate, lang } = useAdminLang();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <div className={styles.ListItem}>
            <div className={styles.Title}>
                <h4>
                    <Legend
                        hasDots
                        title={titleCollection.find(collection => collection.lang === lang)?.ref ?? defaultTitle}>
                        {titleCollection.find(collection => collection.lang === lang)?.ref ?? defaultTitle}
                    </Legend>
                </h4>

                <Legend hasDots title={!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}>
                    {!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}
                </Legend>

                <Legend hasDots title={translate('headers.amount')}>
                    <>{translate('headers.amount')}</>: {totalProducts}
                </Legend>
            </div>

            <MainTitleListState state={isActive} />

            <DropLayout
                isDrop={isDropMore}
                dropCol="center"
                dropRow="end"
                anchorCol="center"
                anchorRow="end"
                drop={
                    <div className={styles.DropContainer} ref={ref}>
                        <MainTitleListActions state={isActive} titleId={titleId} />
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

export default memo(MainTitleListItem);
