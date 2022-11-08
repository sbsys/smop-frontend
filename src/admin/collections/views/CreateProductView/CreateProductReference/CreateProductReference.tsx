/* react */
import { memo } from 'react';
/* custom hook */
import { useCreateProductReference } from './useCreateProductReference.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateProductReference.module.scss';

const CreateProductReference = () => {
    const { handleToNextTab, createProductReferenceFields, createProductFileFields } = useCreateProductReference();

    const { translate } = useAdminLang();

    return (
        <ScrollLayout orientation="col">
            <section className={styles.Reference}>
                <div className={styles.Content}>
                    <div className={styles.Fields}>
                        <h2 title={translate('createproduct.general')}>
                            <Legend hasDots>{translate('createproduct.general')}</Legend>
                        </h2>

                        {createProductReferenceFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Fields}>
                        <h2 title={translate('createproduct.picture')}>
                            <Legend hasDots>{translate('createproduct.picture')}</Legend>
                        </h2>

                        {createProductFileFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>
                </div>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.FillSecondary}
                        title={translate('actions.nextstep')}
                        onClick={handleToNextTab}>
                        <Legend hasDots justify="center">
                            {translate('actions.nextstep')}
                        </Legend>
                    </Button>
                </div>
            </section>
        </ScrollLayout>
    );
};

export default memo(CreateProductReference);
