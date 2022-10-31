/* react */
import { useTranslation } from 'react-i18next';
/* props */
import { TableRow } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
/* styles */
import styles from './TenantList.module.scss';

export const TenantListHeader = (): TableRow => {
    const { t } = useTranslation();

    return {
        columns: [
            {
                children: (
                    <Legend className={styles.Column} hasDots title={t('views.tenants.list.schema')}>
                        {t('views.tenants.list.schema')}
                    </Legend>
                ),
            },
            {
                children: (
                    <Legend className={styles.Column} hasDots title={t('views.tenants.list.contacts')}>
                        {t('views.tenants.list.contacts')}
                    </Legend>
                ),
            },
            {
                children: (
                    <Legend className={styles.Column} hasDots justify="center" title={t('views.tenants.list.state')}>
                        {t('views.tenants.list.state')}
                    </Legend>
                ),
            },
            {
                children: (
                    <Legend className={styles.Column} hasDots justify="center" title={t('views.tenants.list.actions')}>
                        {t('views.tenants.list.actions')}
                    </Legend>
                ),
            },
        ],
    };
};
