/* react */
import { memo } from 'react';
/* context */
import { useCommerceMenuContext } from '../CommerceMenu.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { CommerceMenuActions, NewMenuAction } from '../CommerceMenuActions';
import { CommerceMenuFilter } from '../CommerceMenuFilter';
/* hooks */
import { useAdminLang } from 'admin/core';
/* styles */
import styles from './CommerceMenu.module.scss';

const CommerceMenuDesktop = () => {
    const {
        /* states */
        linkedTitleList,
        isBreakPoint,
    } = useCommerceMenuContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.CommerceMenu}>
            {isBreakPoint && (
                <section className={styles.Filter}>
                    <CommerceMenuFilter />
                </section>
            )}

            <span>
                <NewMenuAction />
            </span>

            <section className={styles.Menus}>
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
                                    <Legend hasDots justify="center" title={translate('headers.amount')}>
                                        {translate('headers.amount')}
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
                    body={linkedTitleList.map(item => ({
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={item.defaultTitle}>
                                        {item.defaultTitle}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        justify="center"
                                        title={`${item.numberMenuItems}/${item.numberGenericItems}`}>
                                        {`${item.numberMenuItems}/${item.numberGenericItems}`}
                                    </Legend>
                                ),
                            },
                            {
                                children: <CommerceMenuActions titleId={item.titleId} />,
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(CommerceMenuDesktop);
