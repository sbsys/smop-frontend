/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { MainTitleListFilter } from '../MainTitleListFilter';
import { MainTitleListState } from '../MainTitleListState';
import { MainTitleListActions, NewMainTitleAction } from '../MainTitleListActions';
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

    const { t, i18n } = useTranslation();

    return (
        <PanelLayout className={styles.MainTitleList}>
            <h1 title={t('views.maintitlelist.title')}>
                <Legend hasDots>{t('views.maintitlelist.title')}</Legend>
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
                                    <Legend hasDots title={t('views.maintitlelist.list.name')}>
                                        {t('views.maintitlelist.list.name')}
                                    </Legend>
                                ),
                                span: 3,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.maintitlelist.list.productamout')}>
                                        {t('views.maintitlelist.list.productamout')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.maintitlelist.list.created')}>
                                        {t('views.maintitlelist.list.created')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.maintitlelist.list.state')}>
                                        {t('views.maintitlelist.list.state')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.maintitlelist.list.actions')}>
                                        {t('views.maintitlelist.list.actions')}
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
                                            item.titleCollection.find(collection => collection.lang === i18n.language)
                                                ?.ref ?? item.defaultTitle
                                        }>
                                        {item.titleCollection.find(collection => collection.lang === i18n.language)
                                            ?.ref ?? item.defaultTitle}
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
