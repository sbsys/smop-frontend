/* react */
import { memo } from 'react';
/* context */
import { useCreateAddonTitleContext } from '../CreateAddonTitle.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <ScrollLayout classNameContent={styles.CreateAddonTitle} orientation="col">
            <form onSubmit={handleCreateAddonTitle}>
                <legend title={translate('createaddontitle.title')}>
                    <Legend hasDots>{translate('createaddontitle.title')}</Legend>
                </legend>

                {createAddonTitleFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={translate('actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateAddonTitle}>
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

export default memo(CreateAddonTitle);
