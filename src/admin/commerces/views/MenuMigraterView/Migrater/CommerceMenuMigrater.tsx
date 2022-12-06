/* react */
import { memo } from 'react';
/* custom hook */
import { useCommerceMigrater } from './useCommerceMigrater.hook';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
import GenericMenuMigrater from './GenericMenuMigrater';
/* assets */
import { FeaturesSrc } from 'assets';
/* styles */
import styles from './Migrater.module.scss';

const CommerceMenuMigrater = () => {
    const { hasCommerces, commerceProps, menu, isCommerceSelected, hasMenu } = useCommerceMigrater();

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.Commerce}>
            {hasCommerces ? (
                <>
                    <div className={styles.CommerceHeader}>
                        <h3 title={translate('migrater.commerce.title')}>
                            <Legend hasDots>{translate('migrater.commerce.title')}</Legend>
                        </h3>

                        <FieldSet {...commerceProps} />
                    </div>

                    {isCommerceSelected ? (
                        <>
                            {hasMenu ? (
                                <GenericMenuMigrater menu={menu} />
                            ) : (
                                <Legend justify="center">{translate('migrater.commerce.nomenu')}</Legend>
                            )}
                        </>
                    ) : (
                        <Legend justify="center">{translate('migrater.commerce.noselected')}</Legend>
                    )}
                </>
            ) : (
                <div className={styles.NoCommerces}>
                    <Legend title={translate('migrater.commerce.nocommerces')} justify="center">
                        {translate('migrater.commerce.nocommerces')}
                    </Legend>

                    <img src={FeaturesSrc} alt={translate('migrater.commerce.nocommerces')} />
                </div>
            )}
        </PanelLayout>
    );
};

export default memo(CommerceMenuMigrater);
