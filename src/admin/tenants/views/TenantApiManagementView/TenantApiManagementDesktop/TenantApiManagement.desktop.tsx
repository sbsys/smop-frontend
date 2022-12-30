/* react */
import { memo } from 'react';
/* context */
import { useTenantApiManagementContext } from '../TenantApiManagement.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { KeyListActions, NewKeyAction } from '../KeyListActions';
import { KeyListFilter } from '../KeyListFilter';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* styles */
import styles from './TenantApiManagement.module.scss';

const TenantApiManagementDesktop = () => {
    const {
        /* states */
        keyList,
        isBreakPoint,
    } = useTenantApiManagementContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.TenantApiManagement}>
            <h1 title={translate('keylist.title')}>
                <Legend hasDots>{translate('keylist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <KeyListFilter />
                </section>
            )}

            <span>
                <NewKeyAction />
            </span>

            <section className={styles.Titles}>
                <TableLayout
                    className={styles.List}
                    header={{
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={translate('headers.name')}>
                                        {translate('headers.name')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.amount')}>
                                        {translate('headers.amount')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.created')}>
                                        {translate('headers.created')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.actions')}>
                                        {translate('headers.actions')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                        ],
                    }}
                    body={keyList.map(item => ({
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={item.referenceKey}>
                                        {item.referenceKey}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots title={item.hash}>
                                        {item.hash}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        classNameContent={styles.Badge}
                                        justify="center"
                                        title={`${item.keyBelongsCommerce.length}`}>
                                        {item.keyBelongsCommerce.length}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        justify="center"
                                        title={!item.createdAt ? '' : format(item.createdAt, 'MMM do, yyyy')}>
                                        {!item.createdAt ? '' : format(item.createdAt, 'MMM do, yyyy')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <KeyListActions
                                        secretId={item.secretId}
                                        isRemovable={item.keyBelongsCommerce.length === 0}
                                    />
                                ),
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(TenantApiManagementDesktop);
