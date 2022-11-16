/* react */
import { memo } from 'react';
/* context */
import { useUpdateLinkedTitleContext } from '../UpdateLinkedTitle.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateLinkedTitle.module.scss';

const UpdateLinkedTitle = () => {
    const {
        /* functions */
        cancelUpdateLinkedMenu,
    } = useUpdateLinkedTitleContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.UpdateLinkedTitle}>
            <form onSubmit={event => event.preventDefault()}>
                <div className={styles.Header} title={translate('menuedit.title')}>
                    <i>
                        <MdEdit />
                    </i>

                    <Legend hasDots>{translate('menuedit.title')}</Legend>
                </div>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        title={translate('actions.cancel')}
                        onClick={cancelUpdateLinkedMenu}
                        className={ButtonStyles.OutlineNone}>
                        <Legend hasDots justify="center">
                            {translate('actions.cancel')}
                        </Legend>
                    </Button>

                    <Button type="submit" title={translate('actions.update')} className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {translate('actions.update')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </PanelLayout>
    );
};

export default memo(UpdateLinkedTitle);
