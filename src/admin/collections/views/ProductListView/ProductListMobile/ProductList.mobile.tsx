/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductListContext } from '../ProductList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { ProductListFilter } from '../ProductListFilter';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './ProductList.module.scss';

const ProductListMobile = () => {
    const {
        /* states */
        /* isDropFilter,
        isBreakPoint,
        addonsTitleList,
        showDropFilter,
        hideDropFilter, */
    } = useProductListContext();

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.ProductList}>
            <div className={styles.Header}>
                <h1 title={t('views.productlist.title')}>
                    <Legend hasDots>{t('views.productlist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={/* isDropFilter && !isBreakPoint */ true}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button
                                title={t('views.productlist.actions.closefilter')}
                                onClick={/* hideDropFilter */ () => {}}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            {/* !isBreakPoint */ true && <ProductListFilter />}
                        </PanelLayout>
                    }>
                    <Button
                        className={styles.Filter}
                        title={t('views.productlist.actions.openfilter')}
                        onClick={/* showDropFilter */ () => {}}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>

            <span>{/* <NewAddonsTitleAction /> */}</span>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {[].map((_, index) => (
                        <li key={index}>{/* {<AddonsTitleListItem {...title} />} */}</li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(ProductListMobile);
