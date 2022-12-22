/* react */
import { memo } from 'react';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* hooks */
import { useAdminLang } from 'admin/core';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { AddonsTitleListFilter } from '../AddonsTitleListFilter';
import { AddonsTitleListState } from '../AddonsTitleListState';
import { AddonsTitleListActions, NewAddonsTitleAction } from '../AddonsTitleListActions';
/* styles */
import styles from './AddonsTitleList.module.scss';

const AddonsTitleListDesktop = () => {
    const {
        /* states */
        isBreakPoint,
        addonsTitleList,
    } = useAddonsTitleListContext();

    const { translate, lang } = useAdminLang();

    return (
        <PanelLayout className={styles.AddonsTitleList}>
            <h1 title={translate('addontitlelist.title')}>
                <Legend hasDots>{translate('addontitlelist.title')}</Legend>
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
                                        {translate('headers.type')}
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
                    body={addonsTitleList.map(item => ({
                        columns: [
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        title={
                                            item.titleCollection?.find(collection => collection.lang === lang)?.ref ??
                                            item.defaultTitle
                                        }>
                                        {item.titleCollection?.find(collection => collection.lang === lang)?.ref ??
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
                                    <Legend hasDots justify="center" title={translate(`types.${item.type}`)}>
                                        {translate(`types.${item.type}`)}
                                        {item.type === 'combo' && ` (${item.maxAccuSubItem})`}
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
