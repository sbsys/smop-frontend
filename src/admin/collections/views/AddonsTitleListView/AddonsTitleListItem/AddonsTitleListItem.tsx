/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { AddonsTitleListState } from '../AddonsTitleListState';
import { AddonsTitleListActions } from '../AddonsTitleListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
/* utils */
import { format } from 'date-fns';
/* types */
import { TitleListItemDTO } from 'admin/collections/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './AddonsTitleListItem.module.scss';

const AddonsTitleListItem: FC<TitleListItemDTO> = ({
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

                <Legend hasDots title={t('views.addonstitlelist.list.productamout')}>
                    <>{t('views.addonstitlelist.list.productamout')}</>: {totalProducts}
                </Legend>
            </div>

            <AddonsTitleListState state={isActive} />

            <DropLayout
                isDrop={isDropMore}
                dropCol="center"
                dropRow="end"
                anchorCol="center"
                anchorRow="end"
                drop={
                    <div className={styles.DropContainer} ref={ref}>
                        <AddonsTitleListActions state={isActive} titleId={titleId} />
                    </div>
                }>
                <Button
                    className={styles.DropAction}
                    onClick={showDropMore}
                    title={t('views.addonstitlelist.list.more')}>
                    <i>
                        <MdMoreVert />
                    </i>
                </Button>
            </DropLayout>
        </div>
    );
};

export default memo(AddonsTitleListItem);
