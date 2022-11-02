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

export const useUpdateGeneral = () => {
    /* states */
    const {
        /* states */
        product,
        hideUpdateGeneral,
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
    const handleUpdateGeneral = handleSubmit(async data => {
        showLoader();

        const service = await /* updateGeneralService(product?.productId ?? '', data) */ {
            error: true,
            message: 'Update General',
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

        hideUpdateGeneral();

        getProductDetail();
    });

    const handleResetUpdateGeneral = () => {
        reset();

        hideUpdateGeneral();
    };

    /* reactivity */

    /* props */

    const updateGeneralFields: FieldSetProps[] = [];

    return { handleUpdateGeneral, handleResetUpdateGeneral, updateGeneralFields };
};
