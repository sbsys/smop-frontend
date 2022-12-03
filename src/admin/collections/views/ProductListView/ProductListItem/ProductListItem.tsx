/* react */
import { FC, memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { ProductListState } from '../ProductListState';
import { ProductListActions } from '../ProductListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* types */
import { ProductListItemDTO } from 'admin/collections/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './ProductListItem.module.scss';

const ProductListItem: FC<ProductListItemDTO> = ({
    productId,
    defaultReference,
    price,
    markAsAddon,
    createdAt,
    isActive,
}) => {
    const { translate } = useAdminLang();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <div className={styles.ListItem}>
            <div className={styles.Title}>
                <h4>
                    <Legend hasDots title={`${markAsAddon ? '(addon) ' : ''}${defaultReference}`}>
                        {defaultReference}
                    </Legend>
                </h4>

                <Legend hasDots justify="end" title={`${price} USD`}>
                    {price} USD
                </Legend>

                <Legend hasDots title={!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}>
                    <>{markAsAddon && '(addon) '}</>
                    <>{!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}</>
                </Legend>
            </div>

            <ProductListState state={isActive} />

            <DropLayout
                isDrop={isDropMore}
                dropCol="center"
                dropRow="end"
                anchorCol="center"
                anchorRow="end"
                drop={
                    <div className={styles.DropContainer} ref={ref}>
                        <ProductListActions state={isActive} productId={productId} />
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

export default memo(ProductListItem);
