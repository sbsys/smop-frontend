/* react */
import { FC, memo } from 'react';
/* custom hook */
import { useGenericMigrater } from './useGenericMigrater.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* types */
import { MenuTitleListItemDTO } from 'admin/commerces/types';
/* assets */
import { TbGitMerge, TbReplace } from 'react-icons/tb';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './Migrater.module.scss';
import ConfirmationModal from './ConfirmationModal';

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
                        title={'Merge'}>
                        <i>
                            <TbGitMerge />
                        </i>

                        <Legend hasDots justify="center">
                            Merge menu
                        </Legend>
                    </Button>

                    <Button
                        className={ButtonStyles.FillWarning}
                        onClick={handleReplaceMenu}
                        type="button"
                        title={'Merge'}>
                        <i>
                            <TbReplace />
                        </i>

                        <Legend hasDots justify="center">
                            Replace menu
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
