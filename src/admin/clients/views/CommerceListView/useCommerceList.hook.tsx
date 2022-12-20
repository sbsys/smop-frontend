/* react */
import { useNavigate } from 'react-router-dom';
/* props */
import { CommerceListContextProps } from './CommerceList.props';
/* store */
import { useClientsSelector } from 'admin/core';
import { selectOrganization } from 'admin/clients/store';

export const useCommerceList = () => {
    /* states */
    const organization = useClientsSelector(selectOrganization);

    /* utils */
    const navigate = useNavigate();

    /* functions */
    const handleSelectCommerce = (commerceId: string) => () => navigate(commerceId);

    /* context */
    const context: CommerceListContextProps = {
        /* states */
        organization,
        /* functions */
        handleSelectCommerce,
    };

    return { context };
};
