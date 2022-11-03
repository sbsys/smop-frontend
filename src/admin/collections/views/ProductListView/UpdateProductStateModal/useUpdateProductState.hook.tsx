/* context */
import { useProductListContext } from '../ProductList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { updateStatusService } from 'admin/collections/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useUpdateProductState = () => {
    /* states */
    const {
        /* states */
        selectedProductToUpdateState,
        /* functions */
        getProductList,
        handleUnselectProductToUpdateState,
    } = useProductListContext();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleCancelUpdateProductState = () => handleUnselectProductToUpdateState();

    const handleUpdateProductState = async () => {
        showLoader();

        const service = await updateStatusService(selectedProductToUpdateState?.productId ?? '');

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

        handleCancelUpdateProductState();

        getProductList();
    };

    return { handleCancelUpdateProductState, handleUpdateProductState };
};
