/* react */
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
import { MdCheckCircle, MdError } from 'react-icons/md';
import { useCommerceDetailContext } from '../CommerceDetail.context';

export const useUpdateReference = () => {
    /* states */
    const {
        /* states */
        commerce,
        hideUpdateReference,
        /* functions */
        getCommerceDetail,
    } = useCommerceDetailContext();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useForm();

    const { t } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateReference = handleSubmit(async data => {
        showLoader();

        const service = await { error: true, message: 'Update reference', data: {} };

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

        hideUpdateReference();

        getCommerceDetail();
    });

    const handleResetUpdateReferenceForm = () => reset();

    return { handleUpdateReference, handleResetUpdateReferenceForm };
};
