/* react */
import { memo } from 'react';
/* custom hook */
import { useGenericMigrater } from './useGenericMigrater.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { TbArrowsJoin, TbReplace } from 'react-icons/tb';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './Migrater.module.scss';

const GenericMenuMigrater = () => {
    const { genericMigraterFields } = useGenericMigrater();

    return (
        <form onSubmit={event => event.preventDefault()}>
            <ScrollLayout orientation="col">
                <div className={styles.Content}>
                    {genericMigraterFields.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}
                </div>
            </ScrollLayout>

            <div className={styles.Actions}>
                <Button className={ButtonStyles.FillSecondary} type="button" title={'Merge'}>
                    <i>
                        <TbArrowsJoin />
                    </i>

                    <Legend hasDots justify="center">
                        Merge menu
                    </Legend>
                </Button>

                <Button className={ButtonStyles.FillWarning} type="button" title={'Merge'}>
                    <i>
                        <TbReplace />
                    </i>

                    <Legend hasDots justify="center">
                        Replace menu
                    </Legend>
                </Button>
            </div>
        </form>
    );
};

export default memo(GenericMenuMigrater);
