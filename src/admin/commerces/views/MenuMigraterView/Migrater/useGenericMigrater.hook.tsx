/* react */
import { useForm } from 'react-hook-form';
/* props */
import { FieldSetProps } from 'admin/core';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* types */
import { MenuTitleListItemDTO } from 'admin/commerces/types';

export const useGenericMigrater = () => {
    /* states */
    const {
        /* states */
        menuMerge: { menu },
    } = useMenuMigraterContext();

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        unregister,
        watch,
        resetField,
    } = useForm({
        mode: 'all',
        /* resolver: yupResolver(), */
    });

    /* functions */
    const titleProps = (menuTitle: MenuTitleListItemDTO): FieldSetProps[] => {
        return [];
    };

    return {};
};
