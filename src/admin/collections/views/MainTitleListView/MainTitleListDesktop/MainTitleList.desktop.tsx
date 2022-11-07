/* react */
import { memo } from 'react';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { MainTitleListFilter } from '../MainTitleListFilter';
import { MainTitleListState } from '../MainTitleListState';
import { MainTitleListActions, NewMainTitleAction } from '../MainTitleListActions';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* styles */
import styles from './MainTitleList.module.scss';

const MainTitleListDesktop = () => {
    const {
        /* states */
        isBreakPoint,
        mainTitleList,
    } = useMainTitleListContext();

    const { translate, lang } = useAdminLang();

    return (
        <PanelLayout className={styles.MainTitleList}>
            <h1 title={translate('maintitlelist.title')}>
                <Legend hasDots>{translate('maintitlelist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <MainTitleListFilter />
                </section>
            )}

            <span>
                <NewMainTitleAction />
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
                                span: 3,
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
                                    <Legend hasDots justify="center" title={translate('headers.status')}>
                                        {translate('headers.status')}
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
                    body={mainTitleList.map(item => ({
                        columns: [
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        title={
                                            item.titleCollection.find(collection => collection.lang === lang)?.ref ??
                                            item.defaultTitle
                                        }>
                                        {item.titleCollection.find(collection => collection.lang === lang)?.ref ??
                                            item.defaultTitle}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        classNameContent={styles.Badge}
                                        justify="center"
                                        title={`${item.totalProducts}`}>
                                        {item.totalProducts}
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
                                children: <MainTitleListState state={item.isActive} />,
                            },
                            {
                                children: <MainTitleListActions state={item.isActive} titleId={item.titleId} />,
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(MainTitleListDesktop);
