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

export const useUpdatePicture = () => {
    /* states */
    const {
        /* states */
        product,
        hideUpdatePicture,
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
    const handleUpdatePicture = handleSubmit(async data => {
        showLoader();

        const service = await /* updatePictureService(product?.productId ?? '', data) */ {
            error: true,
            message: 'Update Picture',
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

        hideUpdatePicture();

        getProductDetail();
    });

    const handleResetUpdatePicture = () => {
        reset();

        hideUpdatePicture();
    };

    /* reactivity */

    /* props */

    const updatePictureFields: FieldSetProps[] = [];

    return { handleUpdatePicture, handleResetUpdatePicture, updatePictureFields };
};
