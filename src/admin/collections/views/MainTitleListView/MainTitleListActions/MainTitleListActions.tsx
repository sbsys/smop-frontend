import { FC, memo } from 'react';
/* store */
import { selectAuthStore } from 'admin/auth';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useAdminLang, useAdminSelector } from 'admin/core';
/* types */
import { TitleState } from 'admin/collections/types';
/* assets */
import { MdEdit, MdThumbDown, MdThumbUp, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './MainTitleListActions.module.scss';

const MainTitleListActions: FC<{ state: TitleState; titleId: number }> = ({ state, titleId }) => {
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const {
        /* functions */
        handleSelectTitle,
        handleSelectTitleToUpdate,
        handleSelectTitleToUpdateState,
    } = useMainTitleListContext();

    const { translate } = useAdminLang();

    return (
        <div className={styles.Actions}>
            {profiles !== 'admin' ? null : (
                <>
                    {state === 'active' ? (
                        <Button
                            className={styles.Delete}
                            onClick={() => handleSelectTitleToUpdateState(titleId)}
                            title={translate('actions.suspend')}>
                            <i>
                                <MdThumbDown />
                            </i>
                        </Button>
                    ) : (
                        <Button
                            className={styles.Restore}
                            onClick={() => handleSelectTitleToUpdateState(titleId)}
                            title={translate('actions.restore')}>
                            <i>
                                <MdThumbUp />
                            </i>
                        </Button>
                    )}

                    <Button
                        className={styles.Edit}
                        onClick={() => handleSelectTitleToUpdate(titleId)}
                        title={translate('actions.edit')}>
                        <i>
                            <MdEdit />
                        </i>
                    </Button>
                </>
            )}

            <Button
                className={styles.View}
                onClick={() => handleSelectTitle(titleId)}
                title={translate('actions.detail')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(MainTitleListActions);
