/* react */
import { useNavigate } from 'react-router-dom';
/* props */
import { CommerceListContextProps } from './CommerceList.props';

export const useCommerceList = () => {
    /* states */

    /* utils */
    const navigate = useNavigate();

    /* functions */
    const handleSelectCommerce = (commerceId: string) => () => navigate(commerceId);

    /* context */
    const context: CommerceListContextProps = {
        /* functions */
        handleSelectCommerce,
    };

    return { context };
};
