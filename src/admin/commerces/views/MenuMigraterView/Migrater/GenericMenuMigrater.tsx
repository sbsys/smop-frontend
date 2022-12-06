/* react */
import { FC, memo } from 'react';
/* custom hook */
import { useGenericMigrater } from './useGenericMigrater.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
import ConfirmationModal from './ConfirmationModal';
/* types */
import { MenuTitleListItemDTO } from 'admin/commerces/types';
/* assets */
import { TbGitMerge, TbReplace } from 'react-icons/tb';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './Migrater.module.scss';

const GenericMenuMigrater: FC<{ menu: MenuTitleListItemDTO[] }> = ({ menu }) => {
    const {
        genericMigraterFields,
        handleMergeMenu,
        handleReplaceMenu,
        isConfirmationModal,
        type,
        handleCancelSubmit,
        handleSubmit,
    } = useGenericMigrater(menu);

    const { translate } = useAdminLang();

    return (
        <>
            <form onSubmit={event => event.preventDefault()}>
                <ScrollLayout orientation="col">
                    <div className={styles.Content}>
                        {genericMigraterFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>
                </ScrollLayout>

                <div className={styles.Actions}>
                    <Button
                        className={ButtonStyles.FillSecondary}
                        onClick={handleMergeMenu}
                        type="button"
                        title={translate('actions.merge')}>
                        <i>
                            <TbGitMerge />
                        </i>

                        <Legend hasDots justify="center">
                            {translate('actions.merge')}
                        </Legend>
                    </Button>

                    <Button
                        className={ButtonStyles.FillSuccess}
                        onClick={handleReplaceMenu}
                        type="button"
                        title={translate('actions.replace')}>
                        <i>
                            <TbReplace />
                        </i>

                        <Legend hasDots justify="center">
                            {translate('actions.replace')}
                        </Legend>
                    </Button>
                </div>
            </form>

            <ConfirmationModal
                isConfirmationModal={isConfirmationModal}
                type={type}
                onCancelSubmit={handleCancelSubmit}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default memo(GenericMenuMigrater);
