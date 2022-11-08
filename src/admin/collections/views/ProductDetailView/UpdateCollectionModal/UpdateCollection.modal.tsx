/* react */
import { Fragment, memo } from 'react';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* custom hook */
import { useUpdateCollection } from './useUpdateCollection.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { Badge, FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateCollection.module.scss';

const UpdateCollectionModal = () => {
    const {
        /* states */
        isUpdateCollection,
    } = useProductDetailContext();

    const {
        handleUpdateCollection,
        handleResetUpdateCollection,
        updateMainCollectionFields,
        mainCollection,
        handleRemoveFromMainCollection,
        markAsAddon,
        updateAccesoryCollectionFields,
        accesoryCollection,
        handleRemoveFromAccesoryCollection,
    } = useUpdateCollection();

    const { translate, lang } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateCollection} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateCollection}>
                <form onSubmit={handleUpdateCollection}>
                    <div className={styles.Header} title={translate('productedit.collection')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('productedit.collection')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateMainCollectionFields.map((field, index) => (
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

                        {updateAccesoryCollectionFields.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}

                        {markAsAddon && (
                            <div className={styles.TitleCollection}>
                                {accesoryCollection.map((accesory, index) => (
                                    <Fragment key={index}>
                                        <Badge onRemove={handleRemoveFromAccesoryCollection(accesory.titleId)}>
                                            <Legend hasDots>
                                                {accesory.titleCollection.find(collection => collection.lang === lang)
                                                    ?.ref ?? accesory.defaultTitle}
                                            </Legend>
                                        </Badge>
                                    </Fragment>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleResetUpdateCollection}>
                            <Legend hasDots justify="center">
                                {translate('actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={translate('actions.update')}>
                            <Legend hasDots justify="center">
                                {translate('actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateCollectionModal);
