/* react */
import { memo } from 'react';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
import { MenuLayout } from '../MenuLayout';
/* components */
import { Button, Legend } from 'shared/components';
import GenericMenuMigrater from './GenericMenuMigrater';
import CommerceMenuMigrater from './CommerceMenuMigrater';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Migrater.module.scss';

const Migrater = () => {
    const {
        /* states */
        menuMerge: { menu },
        isMigraterTabOpen,
        handleOpenMigraterTab,
        isGenericMigraterSelected,
        isCommerceMigraterSelected,
        handleSelectGenericMigrater,
        handleSelectCommerceMigrater,
    } = useMenuMigraterContext();

    const { translate } = useAdminLang();

    return (
        <MenuLayout onOpen={handleOpenMigraterTab} title={translate('migrater.migrater')} isOpen={isMigraterTabOpen}>
            <PanelLayout orientation="col" className={styles.Migrater}>
                <div className={styles.Header}>
                    <Button
                        className={classNames(isGenericMigraterSelected && styles.TitleActive)}
                        title={translate('migrater.generic')}
                        onClick={handleSelectGenericMigrater}>
                        <Legend hasDots justify="center">
                            {translate('migrater.generic')}
                        </Legend>
                    </Button>

                    <Button
                        className={classNames(isCommerceMigraterSelected && styles.TitleActive)}
                        title={translate('migrater.commerce')}
                        onClick={handleSelectCommerceMigrater}>
                        <Legend hasDots justify="center">
                            {translate('migrater.commerce')}
                        </Legend>
                    </Button>
                </div>

                {isGenericMigraterSelected && <GenericMenuMigrater menu={menu} />}

                {isCommerceMigraterSelected && <CommerceMenuMigrater />}
            </PanelLayout>
        </MenuLayout>
    );
};

export default memo(Migrater);
