/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateMainTitle.module.scss';
import { useCreateMainTitleContext } from '../CreateMainTitle.context';

const CreateMainTitle = () => {
    const {
        /* functions */
        handleCreateMainTitle,
        handleCalcelCreateMainTitle,
        /* props */
        createMainTitleFieldProps,
    } = useCreateMainTitleContext();

    const { t } = useTranslation();

    return (
        <ScrollLayout classNameContent={styles.CreateMainTitle} orientation="col">
            <form onSubmit={handleCreateMainTitle}>
                <legend title={t('views.createmaintitle.form.title')}>
                    <Legend hasDots>{t('views.createmaintitle.form.title')}</Legend>
                </legend>

                {createMainTitleFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={t('views.createmaintitle.form.actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateMainTitle}>
                        <Legend hasDots justify="center">
                            {t('views.createmaintitle.form.actions.cancel')}
                        </Legend>
                    </Button>

                    <Button
                        type="submit"
                        title={t('views.createmaintitle.form.actions.create')}
                        className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {t('views.createmaintitle.form.actions.create')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateMainTitle);
