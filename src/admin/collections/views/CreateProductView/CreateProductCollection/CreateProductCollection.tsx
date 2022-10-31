/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useCreateProductCollection } from './useCreateProductCollection.hook';
/* context */
import { useCreateProductContext } from '../CreateProduct.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* styles */
import { ButtonStyles } from 'shared/styles';
import { FieldSet } from 'admin/core';
import styles from './CreateProductCollection.module.scss';

const CreateProductCollection = () => {
    const {
        /* functions */
        handlePrevTab,
    } = useCreateProductContext();

    const {} = useCreateProductCollection();

    const { t } = useTranslation();

    return (
        <ScrollLayout orientation="col">
            <section className={styles.Collection}>
                <div className={styles.Content}>
                    <div className={styles.Fields}>
                        <h2 title={t('views.createproduct.collection.header')}>
                            <Legend hasDots>{t('views.createproduct.collection.header')}</Legend>
                        </h2>

                        {[].map((field, index) => (
                            <FieldSet {...{ field: {} }} key={index} />
                        ))}
                    </div>

                    <div className={styles.Fields}>
                        <h2 title={t('views.createproduct.choice.header')}>
                            <Legend hasDots>{t('views.createproduct.choice.header')}</Legend>
                        </h2>

                        {[].map((field, index) => (
                            <FieldSet {...{ field: {} }} key={index} />
                        ))}
                    </div>
                </div>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.OutlineNone}
                        title={t('actions.prevstep')}
                        onClick={handlePrevTab}>
                        <Legend hasDots justify="center">
                            {t('actions.prevstep')}
                        </Legend>
                    </Button>

                    <Button
                        type="submit"
                        className={ButtonStyles.FillSecondary}
                        title={t('views.createproduct.actions.save')}>
                        <Legend hasDots justify="center">
                            {t('views.createproduct.actions.save')}
                        </Legend>
                    </Button>
                </div>
            </section>
        </ScrollLayout>
    );
};

export default memo(CreateProductCollection);
