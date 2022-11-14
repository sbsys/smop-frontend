/* react */
import { memo } from 'react';
/* custom hook */
import { useCommerceMenuRemove } from './useCommerceMenuRemove.hook';
/* context */
import { useCommerceMenuContext } from '../CommerceMenu.context';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CommerceMenuRemove.module.scss';

const CommerceMenuRemoveModal = () => {
    const {
        /* states */
        selectedTitleToRemove,
    } = useCommerceMenuContext();

    const { handleCancelCommerceMenuRemove, handleCommerceMenuRemove } = useCommerceMenuRemove();

    const { translate } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedTitleToRemove !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.CommerceMenuRemove}>
                <section>
                    <div className={styles.Header} title={translate('commercemenu.removemenu')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('commercemenu.removemenu')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">{selectedTitleToRemove?.defaultTitle}</Legend>

                        <Legend justify="center">{translate('messages.remove')}</Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelCommerceMenuRemove}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={ButtonStyles.FillDanger}
                            title={translate('actions.remove')}
                            onClick={handleCommerceMenuRemove}>
                            <Legend hasDots justify="center">
                                {translate('actions.remove')}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(CommerceMenuRemoveModal);
