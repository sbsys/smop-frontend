/* react */
import { memo } from 'react';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
import { MenuLayout } from '../MenuLayout';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { FeaturesSrc } from 'assets';
/* styles */
import styles from './CurrentMenu.module.scss';

const CurrentMenu = () => {
    const {
        /* states */
        commerce,
        currentMenu,
        isCurrentMenuTabOpen,
        handleOpenCurrentMenuTab,
    } = useMenuMigraterContext();

    const { translate } = useAdminLang();

    return (
        <MenuLayout
            onOpen={handleOpenCurrentMenuTab}
            title={classNames(commerce?.referenceName, commerce?.referenceName && '::', translate('migrater.current'))}
            isOpen={isCurrentMenuTabOpen}>
            {currentMenu.length > 0 ? (
                <ScrollLayout orientation="col">
                    <div className={styles.CurrentMenu}>
                        {currentMenu.map((title, titleIndex) => (
                            <div key={titleIndex}>
                                <div>
                                    <img src={title.url} alt={title.title} crossOrigin="anonymous" />

                                    <Legend hasDots title={title.title}>
                                        {title.title}
                                    </Legend>
                                </div>

                                <ul>
                                    {title.products.map((product, productIndex) => (
                                        <li key={`${titleIndex}_${productIndex}`}>
                                            <Legend hasDots title={product.defaultReference}>
                                                {product.defaultReference}
                                            </Legend>

                                            {/* <Legend title={`${amountFormat(product.price, 4)} USD`} justify="end">
                                                {amountFormat(product.price, 4)} USD
                                            </Legend> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </ScrollLayout>
            ) : (
                <div className={styles.NoCurrentMenu}>
                    <Legend title={translate('migrater.nocurrent')} justify="center">
                        {translate('migrater.nocurrent')}
                    </Legend>

                    <img src={FeaturesSrc} alt={translate('migrater.nocurrent')} />
                </div>
            )}
        </MenuLayout>
    );
};

export default memo(CurrentMenu);
