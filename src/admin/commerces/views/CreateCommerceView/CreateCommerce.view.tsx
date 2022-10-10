/* react */
import { memo } from 'react';
import { FormProvider } from 'react-hook-form';
/* custom hook */
import { useCreateCommerce } from './useCreateCommerce.hook';
/* context */
import { CreateCommerceProvider } from './CreateCommerce.context';
/* components */
import { CreateCommerce } from './CreateCommerce';

const CreateCommerceView = () => {
    const { context, formMethods } = useCreateCommerce();

    return (
        <FormProvider {...formMethods}>
            <CreateCommerceProvider context={context}>
                <CreateCommerce />
            </CreateCommerceProvider>
        </FormProvider>
    );
};

export default memo(CreateCommerceView);
