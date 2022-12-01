import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
/* context */
/* import { useCommerceMenuContext } from '../CommerceMenu.context'; */
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { /* MdDelete,  */ MdEdit, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './CommerceMenuActions.module.scss';

const CommerceMenuActions: FC<{ titleId: number }> = ({ titleId }) => {
    /* const {
        handleSelectTitleToRemove,
    } = useCommerceMenuContext(); */

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    return (
        <div className={styles.Actions}>
            {/* <Button
                className={styles.Delete}
                onClick={() => handleSelectTitleToRemove(titleId)}
                title={translate('actions.remove')}>
                <i>
                    <MdDelete />
                </i>
            </Button> */}

            <Button
                className={styles.Edit}
                onClick={() => navigate(`${titleId}/edit`)}
                title={translate('actions.edit')}>
                <i>
                    <MdEdit />
                </i>
            </Button>

            <Button
                className={styles.View}
                onClick={() => navigate(`${titleId}/detail`)}
                title={translate('actions.detail')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(CommerceMenuActions);
