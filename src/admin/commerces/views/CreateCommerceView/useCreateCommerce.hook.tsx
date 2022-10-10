/* react */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { CreateCommerceContextProps, CreateCommerceForm } from './CreateCommerce.props';

export const useCreateCommerce = () => {
    /* states */
    const formMethods = useForm<CreateCommerceForm>();

    const navigate = useNavigate();

    /* functions */
    const handleCreateCommerceSubmit = formMethods.handleSubmit(async data => {
        console.log(data);
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
