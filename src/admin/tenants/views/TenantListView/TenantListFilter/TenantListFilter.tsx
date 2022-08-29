/* react */
import { memo, useContext } from 'react';
/* context */
import { TenantListContext } from '../TenantList.context';
/* layouts */
import { FieldSet } from 'admin/core';
/* components */
import { Button, Legend } from 'shared/components';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './TenantListFilter.module.scss';

const TenantListFilter = () => {
    const {
        /* props */
        textSearchProps,
        startDateSearchProps,
        endDateSearchProps,
        fromBusinessSearchProps,
        toBusinessSearchProps,
        stateSearchProps,
    } = useContext(TenantListContext);

    return (
        <form
            className={styles.Filter}
            onSubmit={event => event.preventDefault()}
            onReset={event => console.log(event)}>
            <legend>
                <Legend hasDots>Filter tenants</Legend>
            </legend>

            <div className={styles.Content}>
                <div>
                    <FieldSet {...textSearchProps} />

                    <FieldSet {...stateSearchProps} />
                </div>

                <div>
                    <FieldSet {...startDateSearchProps} />

                    <FieldSet {...endDateSearchProps} />
                </div>

                <div>
                    <FieldSet {...fromBusinessSearchProps} />

                    <FieldSet {...toBusinessSearchProps} />
                </div>

                <div>
                    <Button type="reset" className={ButtonStyles.OutlineNone}>
                        <Legend hasDots justify="center">
                            Clean up
                        </Legend>
                    </Button>

                    <Button type="submit" className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            Filter
                        </Legend>
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default memo(TenantListFilter);
