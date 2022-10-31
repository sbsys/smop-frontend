/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useCreateProductReference } from './useCreateProductReference.hook';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CreateProductReference.module.scss';

const CreateProductReference = () => {
    const { handleToNextTab, createProductReferenceFields, createProductFileFields } = useCreateProductReference();

    const { t } = useTranslation();

    return (
        <ScrollLayout orientation="col">
            <section className={styles.Reference}>
                <div className={styles.Content}>
                    <div className={styles.Fields}>
                        <h2 title={t('views.createproduct.reference.header')}>
                            <Legend hasDots>{t('views.createproduct.reference.header')}</Legend>
                        </h2>

                        {createProductReferenceFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Fields}>
                        <h2 title={t('views.createproduct.file.header')}>
                            <Legend hasDots>{t('views.createproduct.file.header')}</Legend>
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
                        title={t('actions.nextstep')}
                        onClick={handleToNextTab}>
                        <Legend hasDots justify="center">
                            {t('actions.nextstep')}
                        </Legend>
                    </Button>
                </div>
            </section>
        </ScrollLayout>
    );
};

export default memo(CreateProductReference);
