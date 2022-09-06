/* react */
import { memo } from 'react';
/* context */
import { CreateTenantProvider } from './CreateTenant.context';
/* custom hook */
import { useCreateTenant } from './useCreateTenant.hook';
/* components */
import { CreateTenant } from './CreateTenant';

const CreateTenantView = () => {
    const { context } = useCreateTenant();

    return (
        <CreateTenantProvider context={context}>
            <CreateTenant />
        </CreateTenantProvider>
    );
};

export default memo(CreateTenantView);
