/* react */
import { Fragment, memo } from 'react';
/* custom hook */
import { useCreateProductCollection } from './useCreateProductCollection.hook';
/* context */
import { useCreateProductContext } from '../CreateProduct.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { Badge, FieldSet, useAdminLang } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
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
        createProductAccuItemsFields,
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
        /* combo choice */
        createProductComboChoiceCollectionFields,
    } = useCreateProductCollection();

    const { translate, lang } = useAdminLang();

    return (
        <ScrollLayout orientation="col">
            <section className={styles.Collection}>
                <div className={styles.Content}>
                    <div className={styles.Fields}>
                        <h2 title={translate('createproduct.collection')}>
                            <Legend hasDots>{translate('createproduct.collection')}</Legend>
                        </h2>

                        {createProductMainCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.TitleCollection}>
                            {mainCollection.map((main, index) => (
                                <Fragment key={index}>
                                    <Badge onRemove={handleRemoveFromMainCollection(main.titleId)}>
                                        <Legend hasDots>
                                            {main.titleCollection.find(collection => collection.lang === lang)?.ref ??
                                                main.defaultTitle}
                                        </Legend>
                                    </Badge>
                                </Fragment>
                            ))}
                        </div>

                        {createProductAccesoryCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.TitleCollection}>
                            {markAsAddon &&
                                addonCollection.map((accesory, index) => (
                                    <Fragment key={index}>
                                        <Badge onRemove={handleRemoveFromAddonCollection(accesory.titleId)}>
                                            <Legend hasDots>
                                                {accesory.titleCollection.find(collection => collection.lang === lang)
                                                    ?.ref ?? accesory.defaultTitle}
                                            </Legend>
                                        </Badge>
                                    </Fragment>
                                ))}
                        </div>

                        {createProductAccuItemsFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>

                    <div className={styles.Fields}>
                        <h2 title={translate('createproduct.accessory')}>
                            <Legend hasDots>{translate('createproduct.accessory')}</Legend>
                        </h2>

                        {createProductMultipleChoiceCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.TitleCollection}>
                            {multipleChoiceCollection.map((multipleChoice, index) => (
                                <Fragment key={index}>
                                    <Badge onRemove={handleRemoveFromMultipleChoiceCollection(multipleChoice.titleId)}>
                                        <Legend hasDots>
                                            {multipleChoice.titleCollection.find(collection => collection.lang === lang)
                                                ?.ref ?? multipleChoice.defaultTitle}
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
                                            {singleChoice.titleCollection.find(collection => collection.lang === lang)
                                                ?.ref ?? singleChoice.defaultTitle}
                                        </Legend>
                                    </Badge>
                                </Fragment>
                            ))}
                        </div>

                        {createProductComboChoiceCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        <div className={styles.TitleCollection}>
                            {/* {comboChoiceCollection.map((comboChoice, index) => (
                                <Fragment key={index}>
                                    <Badge onRemove={handleRemoveFromComboChoiceCollection(comboChoice.titleId)}>
                                        <Legend hasDots>
                                            {comboChoice.titleCollection.find(collection => collection.lang === lang)
                                                ?.ref ?? comboChoice.defaultTitle}
                                        </Legend>
                                    </Badge>
                                </Fragment>
                            ))} */}
                        </div>
                    </div>
                </div>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.OutlineNone}
                        title={translate('actions.prevstep')}
                        onClick={handlePrevTab}>
                        <Legend hasDots justify="center">
                            {translate('actions.prevstep')}
                        </Legend>
                    </Button>

                    <Button type="submit" className={ButtonStyles.FillSecondary} title={translate('actions.save')}>
                        <Legend hasDots justify="center">
                            {translate('actions.save')}
                        </Legend>
                    </Button>
                </div>
            </section>
        </ScrollLayout>
    );
};

export default memo(CreateProductCollection);
