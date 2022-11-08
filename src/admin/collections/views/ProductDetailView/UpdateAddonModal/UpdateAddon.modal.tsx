/* react */
import { Fragment, memo } from 'react';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* custom hook */
import { useUpdateAddon } from './useUpdateAddon.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { Badge, FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateAddon.module.scss';

const UpdateAddonModal = () => {
    const {
        /* states */
        isUpdateAddon,
    } = useProductDetailContext();

    const {
        handleUpdateAddon,
        handleResetUpdateAddon,
        updateAddonMultipleChoiceCollectionFields,
        multipleChoiceCollection,
        handleRemoveFromMultipleChoiceCollection,
        updateAddonSingleChoiceCollectionFields,
        singleChoiceCollection,
        handleRemoveFromSingleChoiceCollection,
    } = useUpdateAddon();

    const { translate, lang } = useAdminLang();

    return (
        <ModalLayout isVisible={isUpdateAddon} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateAddon}>
                <form onSubmit={handleUpdateAddon}>
                    <div className={styles.Header} title={translate('productedit.accessory')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{translate('productedit.accessory')}</Legend>
                    </div>

                    <div className={styles.Content}>
                        {updateAddonMultipleChoiceCollectionFields.map((field, index) => (
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

                        {updateAddonSingleChoiceCollectionFields.map((field, index) => (
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
                    </div>

                    <div className={styles.Actions}>
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            title={translate('actions.cancel')}
                            onClick={handleResetUpdateAddon}>
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

export default memo(UpdateAddonModal);
