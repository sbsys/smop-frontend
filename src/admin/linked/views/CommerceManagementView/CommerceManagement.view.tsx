/* react */
import { memo } from 'react';
/* custom hook */
import { useCommerceManagement } from './useCommerceManagement.hook';
/* context */
import { CommerceManagementProvider } from './CommerceManagement.context';
/* components */
import { CommerceManagement } from './CommerceManagement';
import { NoLinkedCommerce } from './NoLinkedCommerce';

const CommerceManagementView = () => {
    const { context } = useCommerceManagement();

    return (
        <CommerceManagementProvider context={context}>
            {context.linkedCommerceSettings !== null ? <CommerceManagement /> : <NoLinkedCommerce />}
        </CommerceManagementProvider>
    );
};

export default memo(CommerceManagementView);
