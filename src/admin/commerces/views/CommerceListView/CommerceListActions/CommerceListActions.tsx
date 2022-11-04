import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* components */
import { Button } from 'shared/components';
/* types */
import { CommerceState } from 'admin/commerces/types';
/* assets */
import { MdThumbDown, MdThumbUp, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './CommerceListActions.module.scss';

const CommerceListActions: FC<{ state: CommerceState; commerceId: string }> = ({ state, commerceId }) => {
    const {
        /* functions */
        handleSelectCommerceToUpdateState,
    } = useCommerceListContext();

    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button
                    className={styles.Delete}
                    onClick={() => handleSelectCommerceToUpdateState(commerceId)}
                    title={t('views.commercelist.list.suspend')}>
                    <i>
                        <MdThumbDown />
                    </i>
                </Button>
            ) : (
                <Button
                    className={styles.Restore}
                    onClick={() => handleSelectCommerceToUpdateState(commerceId)}
                    title={t('views.commercelist.list.restore')}>
                    <i>
                        <MdThumbUp />
                    </i>
                </Button>
            )}

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
