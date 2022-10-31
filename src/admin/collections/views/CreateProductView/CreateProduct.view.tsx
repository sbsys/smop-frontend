/* react */
import { memo } from 'react';
import { FormProvider } from 'react-hook-form';
/* custom hook */
import { useCreateProduct } from './useCreateProduct.hook';
/* context */
import { CreateProductProvider } from './CreateProduct.context';
/* components */
import { CreateProduct } from './CreateProduct';

const CreateProductView = () => {
    const { context, formMethods } = useCreateProduct();

    return (
        <FormProvider {...formMethods}>
            <CreateProductProvider context={context}>
                <CreateProduct />
            </CreateProductProvider>
        </FormProvider>
    );
};

export default memo(CreateProductView);
