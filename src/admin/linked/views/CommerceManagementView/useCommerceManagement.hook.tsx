/* react */
import { useCallback, useEffect } from 'react';
/* props */
import { CommerceManagementContextProps } from './CommerceManagement.props';

export const useCommerceManagement = () => {
    /* states */
    /* functions */
    const getLinkedCommerceSettings = useCallback(async () => {
        console.log('getLinkedCommerceSettings');
    }, []);

    /* reactivity */
    useEffect(() => {
        getLinkedCommerceSettings();
    }, [getLinkedCommerceSettings]);

    /* props */

    /* context */
    const context: CommerceManagementContextProps = {
        /* states */
        /* functions */
        getLinkedCommerceSettings,
    };

    return { context };
};
