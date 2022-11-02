/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';

export const useUpdateAddon = () => {
    /* states */
    const {
        /* states */
        product,
        hideUpdateAddon,
        /* functions */
        getProductDetail,
    } = useProductDetailContext();

    const { t } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    /* functions */
    const handleUpdateAddon = handleSubmit(async data => {
        showLoader();

        const service = await /* updateAddonService(product?.productId ?? '', data) */ {
            error: true,
            message: 'Update Addon',
            data: {},
        };

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            timestamp: new Date(),
            text: service.message,
        });

        hideUpdateAddon();

        getProductDetail();
    });

    const handleResetUpdateAddon = () => {
        reset();

        hideUpdateAddon();
    };

    /* reactivity */

    /* props */

    const updateAddonFields: FieldSetProps[] = [];

    return { handleUpdateAddon, handleResetUpdateAddon, updateAddonFields };
};
