/* react */
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* custom hook */
import { useUpdateAddon } from './useUpdateAddon.hook';
/* layouts */
import { ModalLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { Badge, FieldSet } from 'admin/core';
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

    const { t, i18n } = useTranslation();

    return (
        <ModalLayout isVisible={isUpdateAddon} rowAlignment="center" colAlignment="center" hasIndentation>
            <ScrollLayout orientation="col" classNameContent={styles.UpdateAddon}>
                <form onSubmit={handleUpdateAddon}>
                    <div className={styles.Header} title={t('views.productdetail.updateaddon.title')}>
                        <i>
                            <MdWarning />
                        </i>

                        <Legend hasDots>{t('views.productdetail.updateaddon.title')}</Legend>
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
                                            {multipleChoice.titleCollection.find(
                                                collection => collection.lang === i18n.language
                                            )?.ref ?? multipleChoice.defaultTitle}
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
                                            {singleChoice.titleCollection.find(
                                                collection => collection.lang === i18n.language
                                            )?.ref ?? singleChoice.defaultTitle}
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
                            title={t('views.productdetail.updateaddon.actions.cancel')}
                            onClick={handleResetUpdateAddon}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updateaddon.actions.cancel')}
                            </Legend>
                        </Button>

                        <Button
                            type="submit"
                            className={ButtonStyles.FillSecondary}
                            title={t('views.productdetail.updateaddon.actions.update')}>
                            <Legend hasDots justify="center">
                                {t('views.productdetail.updateaddon.actions.update')}
                            </Legend>
                        </Button>
                    </div>
                </form>
            </ScrollLayout>
        </ModalLayout>
    );
};

export default memo(UpdateAddonModal);
