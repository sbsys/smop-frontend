/* react */
import { memo } from 'react';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { CommerceListFilter } from '../CommerceListFilter';
import { CommerceListState } from '../CommerceListState';
import { CommerceListActions, NewCommerceAction } from '../CommerceListActions';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* styles */
import styles from './CommerceListDesktop.module.scss';

const CommerceListDesktop = () => {
    const {
        /* states */
        commerceList,
        isBreakPoint,
    } = useCommerceListContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.CommerceList}>
            <h1 title={translate('commercelist.title')}>
                <Legend hasDots>{translate('commercelist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <CommerceListFilter />
                </section>
            )}

            <span>
                <NewCommerceAction />
            </span>

            <section className={styles.Commerces}>
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
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.created')}>
                                        {translate('headers.created')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.status')}>
                                        {translate('headers.status')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.actions')}>
                                        {translate('headers.actions')}
                                    </Legend>
                                ),
                            },
                        ],
                    }}
                    body={commerceList.map(item => ({
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={item.name}>
                                        {item.name}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={format(item.createdAt, 'MMM do, yyyy')}>
                                        {format(item.createdAt, 'MMM do, yyyy')}
                                    </Legend>
                                ),
                            },
                            {
                                children: <CommerceListState state={item.isActive} />,
                            },
                            {
                                children: <CommerceListActions state={item.isActive} commerceId={item.id} />,
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(CommerceListDesktop);
