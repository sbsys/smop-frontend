/* props */
import { TableRow } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import NewTenantAction from './NewTenantAction';
/* styles */
import styles from './TenantList.module.scss';

export const TenantListHeader = (): TableRow => ({
    columns: [
        {
            children: (
                <Legend className={styles.Column} hasDots>
                    Schema
                </Legend>
            ),
        },
        {
            children: (
                <Legend className={styles.Column} hasDots>
                    Contacts
                </Legend>
            ),
        },
        {
            children: (
                <Legend className={styles.Column} hasDots justify="center">
                    State
                </Legend>
            ),
        },
        {
            children: <NewTenantAction />,
        },
    ],
});
