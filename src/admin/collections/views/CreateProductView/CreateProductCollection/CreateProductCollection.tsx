/* react */
import { Fragment, memo } from 'react';
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
import { Badge, FieldSet } from 'admin/core';
import styles from './CreateProductCollection.module.scss';

const CreateProductCollection = () => {
    const {
        /* functions */
        handlePrevTab,
    } = useCreateProductContext();

    const {
        /* main */
        createProductMainCollectionFields,
        mainCollection,
        handleRemoveFromMainCollection,
        /* accesory */
        markAsAddon,
        createProductAccesoryCollectionFields,
        addonCollection,
        handleRemoveFromAddonCollection,
        /* multiple choice */
        createProductMultipleChoiceCollectionFields,
        multipleChoiceCollection,
        handleRemoveFromMultipleChoiceCollection,
        /* single choice */
        createProductSingleChoiceCollectionFields,
        singleChoiceCollection,
        handleRemoveFromSingleChoiceCollection,
    } = useCreateProductCollection();

    const { t, i18n } = useTranslation();

    return (
        <ScrollLayout orientation="col">
            <section className={styles.Collection}>
                <div className={styles.Content}>
                    <div className={styles.Fields}>
                        <h2 title={t('views.createproduct.collection.header')}>
                            <Legend hasDots>{t('views.createproduct.collection.header')}</Legend>
                        </h2>

                        {createProductMainCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.TitleCollection}>
                            {mainCollection.map((main, index) => (
                                <Fragment key={index}>
                                    <Badge onRemove={handleRemoveFromMainCollection(main.titleId)}>
                                        <Legend hasDots>
                                            {main.titleCollection.find(collection => collection.lang === i18n.language)
                                                ?.ref ?? main.defaultTitle}
                                        </Legend>
                                    </Badge>
                                </Fragment>
                            ))}
                        </div>

                        {createProductAccesoryCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        {markAsAddon && (
                            <div className={styles.TitleCollection}>
                                {addonCollection.map((accesory, index) => (
                                    <Fragment key={index}>
                                        <Badge onRemove={handleRemoveFromAddonCollection(accesory.titleId)}>
                                            <Legend hasDots>
                                                {accesory.titleCollection.find(
                                                    collection => collection.lang === i18n.language
                                                )?.ref ?? accesory.defaultTitle}
                                            </Legend>
                                        </Badge>
                                    </Fragment>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.Fields}>
                        <h2 title={t('views.createproduct.choice.header')}>
                            <Legend hasDots>{t('views.createproduct.choice.header')}</Legend>
                        </h2>

                        {createProductMultipleChoiceCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.TitleCollection}>
                            {multipleChoiceCollection.map((multipleChoice, index) => (
                                <Fragment key={index}>
                                    <Badge onRemove={handleRemoveFromMultipleChoiceCollection(multipleChoice.titleId)}>
                                        <Legend hasDots>
                                            {multipleChoice.titleCollection.find(
                                                collection => collection.lang === i18n.language
                                            )?.ref ?? multipleChoice.defaultTitle}
                                        </Legend>
                                    </Badge>
                                </Fragment>
                            ))}
                        </div>

                        {createProductSingleChoiceCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.TitleCollection}>
                            {singleChoiceCollection.map((singleChoice, index) => (
                                <Fragment key={index}>
                                    <Badge onRemove={handleRemoveFromSingleChoiceCollection(singleChoice.titleId)}>
                                        <Legend hasDots>
                                            {singleChoice.titleCollection.find(
                                                collection => collection.lang === i18n.language
                                            )?.ref ?? singleChoice.defaultTitle}
                                        </Legend>
                                    </Badge>
                                </Fragment>
                            ))}
                        </div>
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
