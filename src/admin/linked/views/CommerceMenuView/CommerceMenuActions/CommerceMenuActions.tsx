import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
/* context */
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* types */
/* assets */
import { MdThumbDown, MdThumbUp, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './CommerceMenuActions.module.scss';

const CommerceMenuActions: FC<{ state: 'active' | 'inactive'; titleId: string }> = ({ state, titleId }) => {
    const { translate } = useAdminLang();

    const navigate = useNavigate();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button className={styles.Delete} title={translate('actions.suspend')}>
                    <i>
                        <MdThumbDown />
                    </i>
                </Button>
            ) : (
                <Button className={styles.Restore} title={translate('actions.restore')}>
                    <i>
                        <MdThumbUp />
                    </i>
                </Button>
            )}

            <Button
                className={styles.View}
                onClick={() => navigate(`${titleId}/detail`)}
                disabled={state === 'inactive'}
                title={translate('actions.detail')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(CommerceMenuActions);
