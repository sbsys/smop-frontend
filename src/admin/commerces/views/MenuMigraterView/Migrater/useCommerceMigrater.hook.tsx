/* react */
import { useCallback, useEffect, useState } from 'react';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { menuSampleService } from 'admin/commerces/services';
/* types */
import { MenuTitleListItemDTO } from 'admin/commerces/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

export const useCommerceMigrater = () => {
    /* states */
    const {
        /* states */
        menuMerge: { commerces },
    } = useMenuMigraterContext();

    const hasCommerces = commerces.length > 0;

    const [selectedCommerce, setSelectedCommerce] = useState<string>('');
    const isCommerceSelected = selectedCommerce !== '';

    const [menu, setMenu] = useState<MenuTitleListItemDTO[]>([]);

    const hasMenu = menu.length > 0;

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    /* functions */
    const getCommerceMenu = useCallback(async () => {
        if (!selectedCommerce) return;

        setMenu([]);

        showLoader();

        const service = await menuSampleService(selectedCommerce);

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenu(service.data);
    }, [hideLoader, notify, selectedCommerce, showLoader]);

    /* reactivity */
    useEffect(() => {
        getCommerceMenu();
    }, [getCommerceMenu]);

    /* props */
    const commerceProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: translate('migrater.commerce.placeholder'),
            value: selectedCommerce,
            onChange: (event: any) => setSelectedCommerce(event.target.value),
            strategy: 'select',
            options: commerces.map(commerce => ({ label: commerce.referenceName, value: commerce.commerceId })),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate('migrater.commerce.hint'),
            children: translate('migrater.commerce.hint'),
        },
    };

    return { hasCommerces, commerceProps, menu, isCommerceSelected, hasMenu };
};
