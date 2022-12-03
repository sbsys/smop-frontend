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
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './Migrater.module.scss';

const Migrater = () => {
    const {
        /* states */
        menuMerge,
        isMigraterTabOpen,
        handleOpenMigraterTab,
        isGenericMigraterSelected,
        isCommerceMigraterSelected,
        handleSelectGenericMigrater,
        handleSelectCommerceMigrater,
    } = useMenuMigraterContext();

    return (
        <MenuLayout onOpen={handleOpenMigraterTab} title="Migrater" isOpen={isMigraterTabOpen}>
            <PanelLayout orientation="col" className={styles.Migrater}>
                <div className={styles.Header}>
                    <Button
                        className={classNames(isGenericMigraterSelected && styles.TitleActive)}
                        onClick={handleSelectGenericMigrater}>
                        <Legend hasDots justify="center">
                            Generic menu migrater
                        </Legend>
                    </Button>

                    <Button
                        className={classNames(isCommerceMigraterSelected && styles.TitleActive)}
                        onClick={handleSelectCommerceMigrater}>
                        <Legend hasDots justify="center">
                            Commerce menu migrator
                        </Legend>
                    </Button>
                </div>

                {isGenericMigraterSelected && <GenericMenuMigrater />}

                {isCommerceMigraterSelected && <CommerceMenuMigrater />}
            </PanelLayout>
        </MenuLayout>
    );
};

export default memo(Migrater);
