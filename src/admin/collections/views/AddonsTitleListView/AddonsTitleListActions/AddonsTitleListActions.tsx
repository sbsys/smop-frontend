import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* components */
import { Button } from 'shared/components';
/* types */
import { TitleState } from 'admin/collections/types';
/* assets */
import { MdDelete, MdEdit, MdRestoreFromTrash, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './AddonsTitleList.module.scss';

const AddonsTitleListActions: FC<{ state: TitleState; titleId: number }> = ({ state, titleId }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button className={styles.Delete} title={t('views.addonstitlelist.list.suspend')}>
                    <i>
                        <MdDelete />
                    </i>
                </Button>
            ) : (
                <Button className={styles.Restore} title={t('views.addonstitlelist.list.restore')}>
                    <i>
                        <MdRestoreFromTrash />
                    </i>
                </Button>
            )}

            <Button
                className={styles.Edit}
                onClick={() => navigate(`${titleId}/edit`)}
                disabled={state === 'inactive'}
                title={t('views.addonstitlelist.list.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button
                className={styles.View}
                onClick={() => navigate(`${titleId}/detail`)}
                disabled={state === 'inactive'}
                title={t('views.addonstitlelist.list.view')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(AddonsTitleListActions);
