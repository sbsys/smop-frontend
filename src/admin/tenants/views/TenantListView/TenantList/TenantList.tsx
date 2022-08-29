/* react */
import { memo } from 'react';
/* layouts */
import { TableLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { format } from 'date-fns';
import { classNames } from 'shared/utils';
/* assets */
import { MdDelete, MdEdit, MdPageview, MdRestoreFromTrash } from 'react-icons/md';
/* styles */
import styles from './TenantList.module.scss';

const TenantList = () => {
    return (
        <TableLayout
            className={styles.TenantList}
            header={{
                columns: [
                    {
                        children: (
                            <Legend className={styles.Column} hasDots>
                                Schema
                            </Legend>
                        ),
                        span: 2
                    },
                    {
                        children: (
                            <Legend className={styles.Column} hasDots>
                                Contacts
                            </Legend>
                        ),
                        span: 2
                    },
                    {
                        children: (
                            <Legend className={styles.Column} hasDots justify="center">
                                State
                            </Legend>
                        ),
                        span: 2
                    },
                    { span: 1 },
                ],
            }}
            body={[...Array(200)].map(() => ({
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
                                {true ? (
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

                                <Button className={styles.Edit}>
                                    <i>
                                        <MdEdit />
                                    </i>
                                </Button>

                                <Button className={styles.View}>
                                    <i>
                                        <MdPageview />
                                    </i>
                                </Button>
                            </div>
                        ),
                    },
                ],
            }))}
        />
    );
};

export default memo(TenantList);
