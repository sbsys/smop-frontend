/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* props */
import { DropLayout, TableRow } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
/* utils */
import { format } from 'date-fns';
import { classNames } from 'shared/utils';
/* assets */
import { MdDelete, MdEdit, MdMoreVert, MdRestoreFromTrash, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './TenantList.module.scss';

const TenantListTitle = () => {
    return (
        <div className={styles.TitleHint}>
            <h4>
                <Legend hasDots>churrascos</Legend>
            </h4>

            <Legend hasDots>{format(new Date(), 'MMM do, yyyy')}</Legend>
        </div>
    );
};

const TenantListContacts = () => {
    return (
        <div className={styles.Contacts}>
            <Legend hasDots>admin@churrascos.com</Legend>

            <Legend hasDots>+505-88776655</Legend>
        </div>
    );
};

const TenantListState = ({ state }: { state: string }) => {
    return (
        <Legend className={classNames(styles.State, styles.StateInactive)} hasDots justify="center" title={state}>
            {state}
        </Legend>
    );
};

const TenantListActions = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.Actions}>
            {false ? (
                <Button className={styles.Delete} title={t('views.tenants.list.suspend')}>
                    <i>
                        <MdDelete />
                    </i>
                </Button>
            ) : (
                <Button className={styles.Restore} title={t('views.tenants.list.restore')}>
                    <i>
                        <MdRestoreFromTrash />
                    </i>
                </Button>
            )}

            <Button className={styles.Edit} title={t('views.tenants.list.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button className={styles.View} title={t('views.tenants.list.view')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export const TenantListRow = (): TableRow => ({
    columns: [
        {
            children: <TenantListTitle />,
        },
        {
            children: <TenantListContacts />,
        },
        {
            children: <TenantListState state='active' />,
        },
        {
            children: <TenantListActions />,
        },
    ],
});

const TenantListMore = () => {
    const { t } = useTranslation();

    const [isDropMore, showDropMore, hideDropMore] = useActive();

    const [ref] = useClickOutside(() => hideDropMore());

    useKeyDownEvent(event => event.key === 'Escape' && hideDropMore());

    return (
        <DropLayout
            isDrop={isDropMore}
            dropCol="center"
            dropRow="end"
            anchorCol="center"
            anchorRow="end"
            drop={
                <div className={styles.DropMoreContainer} ref={ref}>
                    <TenantListActions />
                </div>
            }>
            <Button className={styles.DropMoreAction} onClick={showDropMore} title={t('views.tenants.list.more')}>
                <i>
                    <MdMoreVert />
                </i>
            </Button>
        </DropLayout>
    );
};

const TenantListItem = () => {
    return (
        <div className={styles.TenantListItem}>
            <TenantListTitle />

            <TenantListContacts />

            <TenantListState state='inactive' />

            <TenantListMore />
        </div>
    );
};

export default memo(TenantListItem);
