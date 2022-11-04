/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { AddonsTitleListFilter } from '../AddonsTitleListFilter';
import { AddonsTitleListState } from '../AddonsTitleListState';
import { AddonsTitleListActions, NewAddonsTitleAction } from '../AddonsTitleListActions';
/* utils */
import { format } from 'date-fns';
/* styles */
import styles from './AddonsTitleList.module.scss';

const AddonsTitleListDesktop = () => {
    const {
        /* states */
        isBreakPoint,
        addonsTitleList,
    } = useAddonsTitleListContext();

    const { t, i18n } = useTranslation();

    return (
        <PanelLayout className={styles.AddonsTitleList}>
            <h1 title={t('views.addonstitlelist.title')}>
                <Legend hasDots>{t('views.addonstitlelist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <AddonsTitleListFilter />
                </section>
            )}

            <span>
                <NewAddonsTitleAction />
            </span>

            <section className={styles.Titles}>
                <TableLayout
                    className={styles.List}
                    header={{
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={t('views.addonstitlelist.list.name')}>
                                        {t('views.addonstitlelist.list.name')}
                                    </Legend>
                                ),
                                span: 3,
                            },
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        justify="center"
                                        title={t('views.addonstitlelist.list.productamount')}>
                                        {t('views.addonstitlelist.list.productamount')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.addonstitlelist.list.created')}>
                                        {t('views.addonstitlelist.list.created')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.addonstitlelist.list.state')}>
                                        {t('views.addonstitlelist.list.state')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.addonstitlelist.list.actions')}>
                                        {t('views.addonstitlelist.list.actions')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                        ],
                    }}
                    body={addonsTitleList.map(item => ({
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
                                children: <AddonsTitleListState state={item.isActive} />,
                            },
                            {
                                children: <AddonsTitleListActions state={item.isActive} titleId={item.titleId} />,
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(AddonsTitleListDesktop);
