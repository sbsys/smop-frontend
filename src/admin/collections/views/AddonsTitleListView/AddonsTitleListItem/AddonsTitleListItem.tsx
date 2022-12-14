/* react */
import { FC, memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { AddonsTitleListState } from '../AddonsTitleListState';
import { AddonsTitleListActions } from '../AddonsTitleListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
import { useAdminLang } from 'admin/core';
/* types */
import { ComplementTitleListItemDTO } from 'admin/collections/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './AddonsTitleListItem.module.scss';

const AddonsTitleListItem: FC<ComplementTitleListItemDTO> = ({
    titleId,
    defaultTitle,
    titleCollection,
    isActive,
    type,
    totalProducts,
    maxAccuSubItem,
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
                        title={titleCollection?.find(collection => collection.lang === lang)?.ref ?? defaultTitle}>
                        {titleCollection?.find(collection => collection.lang === lang)?.ref ?? defaultTitle}
                    </Legend>
                </h4>

                <Legend hasDots title={translate(`types.${type}`)}>
                    {translate(`types.${type}`)}
                    {type === 'combo' && ` (up to ${maxAccuSubItem})`}
                </Legend>

                <Legend hasDots title={translate('headers.amount')}>
                    <>{translate('headers.amount')}</>: {totalProducts}
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
                <Button className={styles.DropAction} onClick={showDropMore} title={translate('actions.more')}>
                    <i>
                        <MdMoreVert />
                    </i>
                </Button>
            </DropLayout>
        </div>
    );
};

export default memo(AddonsTitleListItem);
