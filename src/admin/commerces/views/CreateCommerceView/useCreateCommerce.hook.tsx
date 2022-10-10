/* react */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* props */
import { CreateCommerceContextProps, CreateCommerceForm } from './CreateCommerce.props';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';

export const useCreateCommerce = () => {
    /* states */
    const formMethods = useForm<CreateCommerceForm>();

    const navigate = useNavigate();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleCreateCommerceSubmit = formMethods.handleSubmit(async data => {
        showLoader();
        console.log(data);

        const service = await { error: true, message: 'Create commerce', data: {} };

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
    });

    const handleCancelCreateCommerce = () => navigate(-1);
    /* reactivity */
    /* props */
    /* context */
    const context: CreateCommerceContextProps = {
        /* states */
        /* functions */
        handleCreateCommerceSubmit,
        handleCancelCreateCommerce,
        /* props */
    };

    return { context, formMethods };
};
