/* react */
import { FC, memo } from 'react';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdDelete, MdEdit, MdRemoveModerator, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './KeyListActions.module.scss';

const KeyListActions: FC<{ secretId: string; isRemovable: boolean }> = ({ secretId, isRemovable }) => {
    const { translate } = useAdminLang();

    return (
        <div className={styles.KeyListActions}>
            {isRemovable ? (
                <Button className={styles.Delete} title={translate('actions.remove')}>
                    <i>
                        <MdDelete />
                    </i>
                </Button>
            ) : (
                <i>
                    <MdRemoveModerator />
                </i>
            )}

            <Button className={styles.Edit} title={translate('actions.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button className={styles.View} title={translate('actions.detail')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(KeyListActions);
