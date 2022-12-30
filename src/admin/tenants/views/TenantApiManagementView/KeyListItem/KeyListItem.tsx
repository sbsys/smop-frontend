/* react */
import { FC, memo } from 'react';
/* components */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { KeyListActions } from '../KeyListActions';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* types */
import { GatewayListItem } from 'admin/tenants/types';
/* assets */
import { MdMoreVert } from 'react-icons/md';
/* styles */
import styles from './KeyListItem.module.scss';

const KeyListItem: FC<GatewayListItem> = ({ secretId, referenceKey, keyBelongsCommerce, createdAt }) => {
    const { translate } = useAdminLang();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <div className={styles.KeyListItem}>
            <div className={styles.Title}>
                <h4>
                    <Legend hasDots title={referenceKey}>
                        {referenceKey}
                    </Legend>
                </h4>

                <Legend hasDots title={!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}>
                    {!createdAt ? '' : format(createdAt, 'MMM do, yyyy')}
                </Legend>

                <Legend hasDots title={translate('headers.amount')}>
                    <>{translate('headers.amount')}</>: {keyBelongsCommerce.length}
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
                        <KeyListActions secretId={secretId} isRemovable={keyBelongsCommerce.length === 0} />
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

export default memo(KeyListItem);
