/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
/* props */
import { MenuMigraterContextProps } from './MenuMigrater.props';
/* hooks */
import { useLoader, useMinWidth } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { menuCurrentService, menuMergeListService } from 'admin/commerces/services';
/* utils */
import { matchBreakPoint } from 'shared/utils';
/* types */
import { MenuMergeDTO } from 'admin/commerces/types';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useMenuMigrater = () => {
    /* states */
    const { commerceId } = useParams<{ commerceId: string }>();

    const [menuMerge, setMenuMerge] = useState<MenuMergeDTO>({
        commerces: [],
        menu: [],
    });

    const [currentTab, setCurrentTab] = useState<number>(0);
    const isCurrentMenuTabOpen = currentTab === 0;
    const isMigraterTabOpen = currentTab === 1;

    const handleOpenCurrentMenuTab = () => setCurrentTab(0);
    const handleOpenMigraterTab = () => setCurrentTab(1);

    const [bp] = useMinWidth();

    const isBreakPoint = useMemo(() => matchBreakPoint('xl', bp).on, [bp]);

    const [currentMigrater, setCurrentMigrater] = useState<number>(0);
    const isGenericMigraterSelected = currentMigrater === 0;
    const isCommerceMigraterSelected = currentMigrater === 1;

    const handleSelectGenericMigrater = () => setCurrentMigrater(0);
    const handleSelectCommerceMigrater = () => setCurrentMigrater(1);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const getMenuMergeList = useCallback(async () => {
        showLoader();

        const service = await menuMergeListService(commerceId ?? '0');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenuMerge(service.data);
    }, [commerceId, hideLoader, notify, showLoader]);

    const getMenuCurrent = useCallback(async () => {
        showLoader();

        const service = await menuCurrentService(commerceId ?? '0');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        /* setCommerces(service.data); */
    }, [commerceId, hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getMenuMergeList();
    }, [getMenuMergeList]);

    useEffect(() => {
        getMenuCurrent();
    }, [getMenuCurrent]);

    /* context */
    const context: MenuMigraterContextProps = {
        /* states */
        menuMerge,
        isCurrentMenuTabOpen,
        isMigraterTabOpen,
        handleOpenCurrentMenuTab,
        handleOpenMigraterTab,
        isBreakPoint,
        isGenericMigraterSelected,
        isCommerceMigraterSelected,
        handleSelectGenericMigrater,
        handleSelectCommerceMigrater,
    };

    return { context };
};