/* react */
import { FC, memo, ReactNode } from 'react';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { TbGitMerge, TbReplace } from 'react-icons/tb';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './Migrater.module.scss';

const ConfirmationModal: FC<{
    isConfirmationModal: boolean;
    type: 'merge' | 'replace';
    onCancelSubmit: () => void;
    onSubmit: () => void;
}> = ({ isConfirmationModal, type, onCancelSubmit, onSubmit }) => {
    const { translate } = useAdminLang();

    const iconStrategy: Record<'merge' | 'replace', ReactNode> = {
        merge: <TbGitMerge />,
        replace: <TbReplace />,
    };

    return (
        <ModalLayout isVisible={isConfirmationModal} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.Confirmation}>
                <section>
                    <div className={styles.ConfirmationHeader} title={type}>
                        <i>{iconStrategy[type]}</i>

                        <Legend hasDots>{type}</Legend>
                    </div>

                    <div className={styles.ConfirmationContent}>
                        <Legend justify="center">{`messages.${type}`}</Legend>
                    </div>

                    <div className={styles.ConfirmationActions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={onCancelSubmit}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="button"
                            className={type === 'merge' ? ButtonStyles.FillSecondary : ButtonStyles.FillWarning}
                            title={`actions.${type}`}
                            onClick={onSubmit}>
                            <i>{iconStrategy[type]}</i>
                            <Legend hasDots justify="center">
                                {`actions.${type}`}
                            </Legend>
                        </Button>
                    </div>
                </section>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(ConfirmationModal);
