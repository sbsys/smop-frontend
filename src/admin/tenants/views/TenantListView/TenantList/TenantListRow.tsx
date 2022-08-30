/* props */
import { TableRow } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { format } from 'date-fns';
import { classNames } from 'shared/utils';
/* assets */
import { MdDelete, MdEdit, MdRestoreFromTrash, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './TenantList.module.scss';

export const TenantListRow = (): TableRow => ({
    columns: [
        {
            children: (
                <div className={styles.TitleHint}>
                    <h4>
                        <Legend hasDots>churrascos</Legend>
                    </h4>

                    <Legend hasDots>{format(new Date(), 'MMM do, yyyy')}</Legend>
                </div>
            ),
        },
        {
            children: (
                <div className={styles.Contacts}>
                    <Legend hasDots>admin@churrascos.com</Legend>

                    <Legend hasDots>+505-88776655</Legend>
                </div>
            ),
        },
        {
            children: (
                <Legend className={classNames(styles.State, styles.StateInactive)} hasDots justify="center">
                    Inactive
                </Legend>
            ),
        },
        {
            children: (
                <div className={styles.Actions}>
                    {false ? (
                        <Button className={styles.Delete}>
                            <i>
                                <MdDelete />
                            </i>
                        </Button>
                    ) : (
                        <Button className={styles.Restore}>
                            <i>
                                <MdRestoreFromTrash />
                            </i>
                        </Button>
                    )}

                    <Button className={styles.Edit} disabled>
                        <i>
                            <MdEdit />
                        </i>
                    </Button>

                    <Button className={styles.View} disabled>
                        <i>
                            <MdVisibility />
                        </i>
                    </Button>
                </div>
            ),
        },
    ],
});
