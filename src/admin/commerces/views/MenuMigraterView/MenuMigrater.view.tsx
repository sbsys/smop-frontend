/* react */
import { memo } from 'react';
/* custom hook */
import { useMenuMigrater } from './useMenuMigrater.hook';
/* context */
import { MenuMigraterProvider } from './MenuMigrater.context';
/* components */
import { MenuMigrater } from './MenuMigrater';

const MenuMigraterView = () => {
    const { context } = useMenuMigrater();

    return (
        <MenuMigraterProvider context={context}>
            <MenuMigrater />
        </MenuMigraterProvider>
    );
};

export default memo(MenuMigraterView);
