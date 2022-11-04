/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { MainTitleListState } from '../MainTitleListState';
import { MainTitleListActions } from '../MainTitleListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
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
    const { t, i18n } = useTranslation();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <div className={styles.ListItem}>
            <div className={styles.Title}>
                <h4>
                    <Legend
                        hasDots
                        title={
                            titleCollection.find(collection => collection.lang === i18n.language)?.ref ?? defaultTitle
                        }>
                        {titleCollection.find(collection => collection.lang === i18n.language)?.ref ?? defaultTitle}
                    </Legend>
                </h4>

                <Legend hasDots title={!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}>
                    {!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}
                </Legend>

                <Legend hasDots title={t('views.maintitlelist.list.productamout')}>
                    <>{t('views.maintitlelist.list.productamout')}</>: {totalProducts}
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
                <Button className={styles.DropAction} onClick={showDropMore} title={t('views.maintitlelist.list.more')}>
                    <i>
                        <MdMoreVert />
                    </i>
                </Button>
            </DropLayout>
        </div>
    );
};

export default memo(MainTitleListItem);
