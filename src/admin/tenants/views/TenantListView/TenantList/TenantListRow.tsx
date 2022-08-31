/* react */
import { memo } from 'react';
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

const TenantListState = () => {
    return (
        <Legend className={classNames(styles.State, styles.StateInactive)} hasDots justify="center">
            Inactive
        </Legend>
    );
};

const TenantListActions = () => {
    return (
        <div className={styles.Actions}>
            {false ? (
                <Button className={styles.Delete}>
                    <i>
                        <MdDelete />
                    </i>
                </Button>
            ) : (
                <Button className={styles.Restore}>
                    <i>
                        <MdRestoreFromTrash />
                    </i>
                </Button>
            )}

            <Button className={styles.Edit} disabled>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button className={styles.View} disabled>
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
            children: <TenantListState />,
        },
        {
            children: <TenantListActions />,
        },
    ],
});

const TenantListMore = () => {
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
            <Button className={styles.DropMoreAction} onClick={showDropMore}>
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

            <TenantListState />

            <TenantListMore />
        </div>
    );
};

export default memo(TenantListItem);
