/* context */
import { useCommerceListContext } from '../CommerceList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { updateStateService } from 'admin/commerces/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useUpdateCommerceState = () => {
    /* states */
    const {
        /* states */
        selectedCommerceToUpdateState,
        /* functions */
        getCommerceList,
        handleUnselectCommerceToUpdateState,
    } = useCommerceListContext();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleCancelUpdateCommerceState = () => handleUnselectCommerceToUpdateState();

    const handleUpdateCommerceState = async () => {
        showLoader();

        const service = await updateStateService(selectedCommerceToUpdateState?.id ?? '');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            text: service.message,
            timestamp: new Date(),
        });

        handleCancelUpdateCommerceState();

        getCommerceList();
    };

    return { handleCancelUpdateCommerceState, handleUpdateCommerceState };
};
