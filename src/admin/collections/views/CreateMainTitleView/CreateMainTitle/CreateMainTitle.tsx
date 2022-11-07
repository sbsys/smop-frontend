/* react */
import { memo } from 'react';
/* context */
import { useCreateMainTitleContext } from '../CreateMainTitle.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateMainTitle.module.scss';

const CreateMainTitle = () => {
    const {
        /* functions */
        handleCreateMainTitle,
        handleCalcelCreateMainTitle,
        /* props */
        createMainTitleFieldProps,
    } = useCreateMainTitleContext();

    const { translate } = useAdminLang();

    return (
        <ScrollLayout classNameContent={styles.CreateMainTitle} orientation="col">
            <form onSubmit={handleCreateMainTitle}>
                <legend title={translate('createmaintitle.title')}>
                    <Legend hasDots>{translate('createmaintitle.title')}</Legend>
                </legend>

                {createMainTitleFieldProps.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}

                <div>
                    <Button
                        type="button"
                        title={translate('actions.cancel')}
                        className={ButtonStyles.OutlineNone}
                        onClick={handleCalcelCreateMainTitle}>
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

export default memo(CreateMainTitle);
