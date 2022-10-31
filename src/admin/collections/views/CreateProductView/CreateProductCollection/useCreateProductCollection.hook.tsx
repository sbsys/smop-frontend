/* react */
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { CreateProductFormData } from '../CreateProduct.props';

export const useCreateProductCollection = () => {
    /* states */
    const {
        register,
        setValue,
        formState: { errors },
        watch,
        trigger,
        unregister,
    } = useFormContext<CreateProductFormData>();

    const [mainCollectionCount, setMainCollectionCount] = useState(0);
    const addMainCollection = useCallback(() => setMainCollectionCount(count => count + 1), []);
    const removeMainCollection = useCallback(() => {
        unregister('mainCollection');

        setMainCollectionCount(count => (count > 0 ? count - 1 : count));
    }, [unregister]);

    const [accesoryCollectionCount, setAccesoryCollectionCount] = useState(0);
    const addAccesoryCollection = useCallback(() => setAccesoryCollectionCount(count => count + 1), []);
    const removeAccesoryCollection = useCallback(() => {
        unregister('accesoryCollection');

        setAccesoryCollectionCount(count => (count > 0 ? count - 1 : count));
    }, [unregister]);

    const { t } = useTranslation();

    return {};
};
