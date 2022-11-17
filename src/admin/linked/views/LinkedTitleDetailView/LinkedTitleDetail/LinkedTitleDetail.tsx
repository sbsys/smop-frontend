/* react */
import { memo } from 'react';
/* context */
import { useCommerceManagementContext } from '../../CommerceManagementView';
import { useLinkedTitleDetailContext } from '../LinkedTitleDetail.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { amountFormat } from 'shared/utils';
/* assets */
import { MdVisibility } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './LinkedTitleDetail.module.scss';

const LinkedTitleDetail = () => {
    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const {
        /* states */
        linkedTitle,
        productList,
        /* functions */
        handleCloseLinkedTitleDetail,
        handleEditLinkedTitleDetail,
    } = useLinkedTitleDetailContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.LinkedTitleDetail}>
            <div className={styles.Header} title={translate('menudetail.title')}>
                <i>
                    <MdVisibility />
                </i>

                <Legend hasDots>{translate('menudetail.title')}</Legend>
            </div>

            <PanelLayout orientation="col" className={styles.Content}>
                <div>
                    <Legend hasDots className={styles.Title} title={translate('headers.name')}>
                        {translate('headers.name')}:
                    </Legend>

                    <Legend title={linkedTitle?.defaultTitle}>{linkedTitle?.defaultTitle}</Legend>

                    <Legend hasDots className={styles.Title} title={translate('headers.amount')}>
                        {translate('headers.amount')}:
                    </Legend>

                    <Legend title={`${linkedTitle?.numberMenuItems}/${linkedTitle?.numberGenericItems}`}>
                        {`${linkedTitle?.numberMenuItems}/${linkedTitle?.numberGenericItems}`}
                    </Legend>
                </div>

                <ScrollLayout orientation="col">
                    <ul className={styles.List}>
                        {productList.map((product, index) => (
                            <li key={index}>
                                <img src={product.url} alt={product.defaultReference} crossOrigin="anonymous" />

                                <Legend hasDots title={product.defaultReference}>
                                    {product.defaultReference}
                                </Legend>

                                <Legend title={amountFormat(product.price, linkedCommerceSettings?.decimals ?? 2)}>
                                    {amountFormat(product.price, linkedCommerceSettings?.decimals ?? 2)} $
                                </Legend>
                            </li>
                        ))}
                    </ul>
                </ScrollLayout>
            </PanelLayout>

            <div className={styles.Actions}>
                <Button
                    type="button"
                    title={translate('actions.close')}
                    onClick={handleCloseLinkedTitleDetail}
                    className={ButtonStyles.OutlineNone}>
                    <Legend hasDots justify="center">
                        {translate('actions.close')}
                    </Legend>
                </Button>

                <Button
                    type="button"
                    title={translate('actions.edit')}
                    onClick={handleEditLinkedTitleDetail}
                    className={ButtonStyles.FillWarning}>
                    <Legend hasDots justify="center">
                        {translate('actions.edit')}
                    </Legend>
                </Button>
            </div>
        </PanelLayout>
    );
};

export default memo(LinkedTitleDetail);
