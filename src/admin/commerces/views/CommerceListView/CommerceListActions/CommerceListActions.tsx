import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* components */
import { Button } from 'shared/components';
/* types */
import { CommerceState } from 'admin/commerces/types';
/* assets */
import { MdDelete, MdEdit, MdRestoreFromTrash, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './CommerceListActions.module.scss';

const CommerceListActions: FC<{ state: CommerceState; commerceId: number }> = ({ state, commerceId }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button className={styles.Delete} title={t('views.commercelist.list.suspend')}>
                    <i>
                        <MdDelete />
                    </i>
                </Button>
            ) : (
                <Button className={styles.Restore} title={t('views.commercelist.list.restore')}>
                    <i>
                        <MdRestoreFromTrash />
                    </i>
                </Button>
            )}

            <Button
                className={styles.Edit}
                onClick={() => navigate(`../${commerceId}/edit`)}
                disabled={state === 'inactive'}
                title={t('views.commercelist.list.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button
                className={styles.View}
                onClick={() => navigate(`../${commerceId}/detail`)}
                disabled={state === 'inactive'}
                title={t('views.commercelist.list.view')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(CommerceListActions);
