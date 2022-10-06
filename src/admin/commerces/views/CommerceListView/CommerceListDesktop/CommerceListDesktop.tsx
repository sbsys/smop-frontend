/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { CommerceListFilter } from '../CommerceListFilter';
import { CommerceListState } from '../CommerceListState';
import { CommerceListActions, NewCommerceAction } from '../CommerceListActions';
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

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.CommerceList}>
            <h1 title={t('views.commercelist.title')}>
                <Legend hasDots>{t('views.commercelist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <CommerceListFilter />
                </section>
            )}

            <section className={styles.Commerces}>
                <TableLayout
                    className={styles.List}
                    header={{
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={t('views.commercelist.list.name')}>
                                        {t('views.commercelist.list.name')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.commercelist.list.created')}>
                                        {t('views.commercelist.list.created')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.commercelist.list.state')}>
                                        {t('views.commercelist.list.state')}
                                    </Legend>
                                ),
                            },
                            {
                                children: <NewCommerceAction />,
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
