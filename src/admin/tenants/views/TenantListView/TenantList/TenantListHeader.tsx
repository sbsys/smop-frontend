/* props */
import { TableRow } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* styles */
import styles from './TenantList.module.scss';

export const TenantListHeader = (): TableRow => {
    const { translate } = useAdminLang();

    return {
        columns: [
            {
                children: (
                    <Legend className={styles.Column} hasDots title={translate('headers.name')}>
                        {translate('headers.name')}
                    </Legend>
                ),
            },
            {
                children: (
                    <Legend className={styles.Column} hasDots title={translate('headers.contacts')}>
                        {translate('headers.contacts')}
                    </Legend>
                ),
            },
            {
                children: (
                    <Legend className={styles.Column} hasDots justify="center" title={translate('headers.status')}>
                        {translate('headers.status')}
                    </Legend>
                ),
            },
            {
                children: (
                    <Legend className={styles.Column} hasDots justify="center" title={translate('headers.actions')}>
                        {translate('headers.actions')}
                    </Legend>
                ),
            },
        ],
    };
};
