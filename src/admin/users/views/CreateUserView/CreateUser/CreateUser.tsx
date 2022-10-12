/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCreateUserContext } from '../CreateUser.Context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* styles */
import styles from './CreateUser.module.scss';
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
import { ButtonStyles } from 'shared/styles';

const CreateUser = () => {
    const {
        /* functions */
        handleCreateUser,
        handleCalcelCreateUser,
        /* props */
        createUserFieldProps,
    } = useCreateUserContext();

    const { t } = useTranslation();

    return (
        <ScrollLayout classNameContent={styles.CreateUser} orientation="col">
            <form onSubmit={handleCreateUser}>
                <legend title={t('views.createuser.form.title')}>
                    <Legend hasDots>{t('views.createuser.form.title')}</Legend>
                </legend>

                {createUserFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={t('views.createuser.form.actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateUser}>
                        <Legend hasDots justify="center">
                            {t('views.createuser.form.actions.cancel')}
                        </Legend>
                    </Button>

                    <Button
                        type="submit"
                        title={t('views.createuser.form.actions.create')}
                        className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {t('views.createuser.form.actions.create')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateUser);
