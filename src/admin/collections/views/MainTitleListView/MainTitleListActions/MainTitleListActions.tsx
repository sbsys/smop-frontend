import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* components */
import { Button } from 'shared/components';
/* types */
import { TitleState } from 'admin/collections/types';
/* assets */
import { MdDelete, MdEdit, MdRestoreFromTrash, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './MainTitleListActions.module.scss';

const MainTitleListActions: FC<{ state: TitleState; titleId: number }> = ({ state, titleId }) => {
    const {
        /* functions */
        handleSelectTitleToUpdate,
    } = useMainTitleListContext();

    const { t } = useTranslation();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button className={styles.Delete} title={t('views.maintitlelist.list.suspend')}>
                    <i>
                        <MdDelete />
                    </i>
                </Button>
            ) : (
                <Button className={styles.Restore} title={t('views.maintitlelist.list.restore')}>
                    <i>
                        <MdRestoreFromTrash />
                    </i>
                </Button>
            )}

            <Button
                className={styles.Edit}
                onClick={() => handleSelectTitleToUpdate(titleId)}
                disabled={state === 'inactive'}
                title={t('views.maintitlelist.list.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button
                className={styles.View}
                onClick={() => {}}
                disabled={state === 'inactive'}
                title={t('views.maintitlelist.list.view')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(MainTitleListActions);
