/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateCommerceState } from './useUpdateCommerceState.hook';
/* context */
import { useCommerceListContext } from '../CommerceList.context';
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
import styles from './UpdateCommerceState.module.scss';

const UpdateCommerceStateModal = () => {
    const {
        /* states */
        selectedCommerceToUpdateState,
    } = useCommerceListContext();

    const { handleCancelUpdateCommerceState, handleUpdateCommerceState } = useUpdateCommerceState();

    const { translate } = useAdminLang();

    return (
        <ModalLayout
            isVisible={selectedCommerceToUpdateState !== null}
            rowAlignment="center"
            colAlignment="center"
            hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateState}>
                <section>
                    <div className={styles.Header} title={translate('commercelist.updatestatus')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('commercelist.updatestatus')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        <Legend justify="center">{selectedCommerceToUpdateState?.name}</Legend>

                        <Legend justify="center">
                            {translate(
                                `messages.${
                                    selectedCommerceToUpdateState?.isActive === 'active' ? 'deactivate' : 'activate'
                                }`
                            )}
                        </Legend>
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleCancelUpdateCommerceState}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={
                                selectedCommerceToUpdateState?.isActive === 'active'
                                    ? ButtonStyles.FillDanger
                                    : ButtonStyles.FillSuccess
                            }
                            title={
                                selectedCommerceToUpdateState?.isActive === 'active'
                                    ? translate('actions.deactivate')
                                    : translate('actions.activate')
                            }
                            onClick={handleUpdateCommerceState}>
                            <Legend hasDots justify="center">
                                {selectedCommerceToUpdateState?.isActive === 'active'
                                    ? translate('actions.deactivate')
                                    : translate('actions.activate')}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateCommerceStateModal);
