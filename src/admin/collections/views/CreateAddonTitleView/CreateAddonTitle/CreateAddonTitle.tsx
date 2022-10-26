/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useCreateAddonTitleContext } from '../CreateAddonTitle.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateAddonTitle.module.scss';

const CreateAddonTitle = () => {
    const {
        /* functions */
        handleCreateAddonTitle,
        handleCalcelCreateAddonTitle,
        /* props */
        createAddonTitleFieldProps,
    } = useCreateAddonTitleContext();

    const { t } = useTranslation();

    return (
        <ScrollLayout classNameContent={styles.CreateAddonTitle} orientation="col">
            <form onSubmit={handleCreateAddonTitle}>
                <legend title={t('views.createaddontitle.form.title')}>
                    <Legend hasDots>{t('views.createaddontitle.form.title')}</Legend>
                </legend>

                {createAddonTitleFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={t('views.createaddontitle.form.actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateAddonTitle}>
                        <Legend hasDots justify="center">
                            {t('views.createaddontitle.form.actions.cancel')}
                        </Legend>
                    </Button>

                    <Button
                        type="submit"
                        title={t('views.createaddontitle.form.actions.create')}
                        className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {t('views.createaddontitle.form.actions.create')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </ScrollLayout>
    );
};

export default memo(CreateAddonTitle);
