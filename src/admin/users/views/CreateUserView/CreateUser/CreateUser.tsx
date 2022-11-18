/* react */
import { memo } from 'react';
/* context */
import { useCreateUserContext } from '../CreateUser.Context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { FieldSet, useAdminLang } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateUser.module.scss';

const CreateUser = () => {
    const {
        /* functions */
        handleCreateUser,
        handleCalcelCreateUser,
        /* props */
        createUserFieldProps,
    } = useCreateUserContext();

    const { translate } = useAdminLang();

    return (
        <ScrollLayout classNameContent={styles.CreateUser} orientation="col">
            <form onSubmit={handleCreateUser}>
                <legend title={translate('createuser.title')}>
                    <Legend hasDots>{translate('createuser.title')}</Legend>
                </legend>

                {createUserFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={translate('actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateUser}>
                        <Legend hasDots justify="center">
                            {translate('actions.cancel')}
                        </Legend>
                    </Button>

                    <Button type="submit" title={translate('actions.save')} className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {translate('actions.save')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateUser);
