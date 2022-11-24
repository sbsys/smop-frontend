import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
/* store */
import { selectAuthStore } from 'admin/auth';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useAdminLang, useAdminSelector } from 'admin/core';
/* types */
import { CommerceState } from 'admin/commerces/types';
/* assets */
import { MdRestaurantMenu, MdThumbDown, MdThumbUp, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './CommerceListActions.module.scss';

const CommerceListActions: FC<{ state: CommerceState; commerceId: string }> = ({ state, commerceId }) => {
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const {
        /* functions */
        handleSelectCommerceToUpdateState,
    } = useCommerceListContext();

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    return (
        <div className={styles.Actions}>
            {profiles !== 'admin' ? null : (
                <>
                    {state === 'active' ? (
                        <Button
                            className={styles.Delete}
                            onClick={() => handleSelectCommerceToUpdateState(commerceId)}
                            title={translate('actions.suspend')}>
                            <i>
                                <MdThumbDown />
                            </i>
                        </Button>
                    ) : (
                        <Button
                            className={styles.Restore}
                            onClick={() => handleSelectCommerceToUpdateState(commerceId)}
                            title={translate('actions.restore')}>
                            <i>
                                <MdThumbUp />
                            </i>
                        </Button>
                    )}
                </>
            )}

            <Button
                className={styles.View}
                onClick={() => navigate(`../${commerceId}/detail`)}
                title={translate('actions.detail')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>

            {profiles === 'admin' ? null : (
                <Button
                    className={styles.Menu}
                    onClick={() => navigate(`../${commerceId}/management/menu`)}
                    title={translate('commercemenu.title')}>
                    <i>
                        <MdRestaurantMenu />
                    </i>
                </Button>
            )}
        </div>
    );
};

export default memo(CommerceListActions);
