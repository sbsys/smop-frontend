/* react */
import { FC, memo } from 'react';
/* props */
import { DropLayout, TableRow } from 'shared/layouts';
import { TitleSubtitle } from '../TenantList.props';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
/* utils */
import { format } from 'date-fns';
import { classNames } from 'shared/utils';
/* types */
import { TenantState, TenantItemDTO } from 'admin/tenants';
/* assets */
import { MdEdit, MdMoreVert, MdThumbDown, MdThumbUp, MdVisibility } from 'react-icons/md';
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
    const { translate } = useAdminLang();

    const stateStylesStrategy: Record<TenantState, string> = {
        active: styles.StateActive,
        inactive: styles.StateInactive,
    };

    return (
        <Legend
            className={classNames(styles.State, stateStylesStrategy[state])}
            hasDots
            justify="center"
            title={translate(`status.${state}`)}>
            {translate(`status.${state}`)}
        </Legend>
    );
};

const TenantListActions = ({ state }: { state: TenantState }) => {
    const { translate } = useAdminLang();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button className={styles.Delete} title={translate('actions.suspend')}>
                    <i>
                        <MdThumbDown />
                    </i>
                </Button>
            ) : (
                <Button className={styles.Restore} title={translate('actions.restore')}>
                    <i>
                        <MdThumbUp />
                    </i>
                </Button>
            )}

            <Button className={styles.Edit} disabled={state === 'inactive'} title={translate('actions.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button className={styles.View} disabled={state === 'inactive'} title={translate('actions.detail')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export const TenantListRow = (tenant: TenantItemDTO): TableRow => ({
    columns: [
        {
            children: <TenantListTitle title={tenant.schema} subtitle={format(tenant.created, 'MMM do, yyyy')} />,
        },
        {
            children: <TenantListContacts title={tenant.email} subtitle={tenant.phone} />,
        },
        {
            children: <TenantListState state={tenant.state} />,
        },
        {
            children: <TenantListActions state={tenant.state} />,
        },
    ],
});

const TenantListMore = () => {
    const { translate } = useAdminLang();

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
            <Button className={styles.DropMoreAction} onClick={showDropMore} title={translate('actions.more')}>
                <i>
                    <MdMoreVert />
                </i>
            </Button>
        </DropLayout>
    );
};

const TenantListItem: FC<TenantItemDTO> = ({ schema, created, email, phone, state }) => {
    return (
        <div className={styles.TenantListItem}>
            <TenantListTitle title={schema} subtitle={format(created, 'MMM do, yyyy')} />

            <TenantListContacts title={email} subtitle={phone} />

            <TenantListState state={state} />

            <TenantListMore />
        </div>
    );
};

export default memo(TenantListItem);
