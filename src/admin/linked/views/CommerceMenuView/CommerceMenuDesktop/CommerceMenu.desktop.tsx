/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* styles */
import styles from './CommerceMenu.module.scss';

const CommerceMenuDesktop = () => {
    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.CommerceMenu}>
            {/* isBreakPoint */ true && <section className={styles.Filter}>{/* <CommerceMenuFilter /> */}</section>}

            <span>{/* <NewMenuAction /> */}</span>

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
                    body={[].map(_ => ({
                        columns: [
                            {
                                /* children: (
                            <Legend hasDots title={item.name}>
                                {item.name}
                            </Legend>
                        ), */
                            },
                            {
                                /* children: (
                            <Legend hasDots justify="center" title={format(item.createdAt, 'MMM do, yyyy')}>
                                {format(item.createdAt, 'MMM do, yyyy')}
                            </Legend>
                        ), */
                            },
                            {
                                /* children: <CommerceMenuState state={item.isActive} />, */
                            },
                            {
                                /* children: <CommerceMenuActions state={item.isActive} commerceId={item.id} />, */
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(CommerceMenuDesktop);
