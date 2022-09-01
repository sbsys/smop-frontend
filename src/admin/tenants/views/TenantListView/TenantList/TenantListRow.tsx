/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* props */
import { DropLayout, TableRow } from 'shared/layouts';
import { TitleSubtitle } from '../TenantList.props';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
/* utils */
import { format } from 'date-fns';
import { classNames } from 'shared/utils';
/* types */
import { TenantState } from 'admin/tenants';
/* assets */
import { MdDelete, MdEdit, MdMoreVert, MdRestoreFromTrash, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './TenantList.module.scss';

const TenantListTitle: FC<TitleSubtitle> = ({ title, subtitle }) => {
    return (
        <div className={styles.TitleHint}>
            <h4>
                <Legend hasDots title={title}>
                    {title}
                </Legend>
            </h4>

            <Legend hasDots title={subtitle}>
                {subtitle}
            </Legend>
        </div>
    );
};

const TenantListContacts: FC<TitleSubtitle> = ({ title, subtitle }) => {
    return (
        <div className={styles.Contacts}>
            <Legend hasDots title={title}>
                {title}
            </Legend>

            <Legend hasDots title={subtitle}>
                {subtitle}
            </Legend>
        </div>
    );
};

const TenantListState: FC<{ state: TenantState }> = ({ state }) => {
    const { t } = useTranslation();

    const stateStylesStrategy: Record<TenantState, string> = {
        active: styles.StateActive,
        inactive: styles.StateInactive,
    };

    return (
        <Legend
            className={classNames(styles.State, stateStylesStrategy[state])}
            hasDots
            justify="center"
            title={t(`views.tenants.filter.state.states.${state}`)}>
            {t(`views.tenants.filter.state.states.${state}`)}
        </Legend>
    );
};

const TenantListActions = ({ state }: { state: TenantState }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
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

            <Button className={styles.Edit} disabled={state === 'inactive'} title={t('views.tenants.list.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button className={styles.View} disabled={state === 'inactive'} title={t('views.tenants.list.view')}>
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
            children: <TenantListTitle title="Churrascos" subtitle={format(new Date(), 'MMM do, yyyy')} />,
        },
        {
            children: <TenantListContacts title="admin@churrascos.com" subtitle="+505-88772211" />,
        },
        {
            children: <TenantListState state="active" />,
        },
        {
            children: <TenantListActions state="active" />,
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
                    <TenantListActions state="active" />
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
            <TenantListTitle title="Churrascos" subtitle={format(new Date(), 'MMM do, yyyy')} />

            <TenantListContacts title="admin@churrascos.com" subtitle="+505-88772211" />

            <TenantListState state="active" />

            <TenantListMore />
        </div>
    );
};

export default memo(TenantListItem);
