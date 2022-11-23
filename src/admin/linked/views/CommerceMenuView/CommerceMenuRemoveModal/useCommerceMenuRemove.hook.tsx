/* react */
import { useParams } from 'react-router-dom';
/* context */
import { useCommerceManagementContext } from '../../CommerceManagementView';
import { useCommerceMenuContext } from '../CommerceMenu.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { updateLinkedProductListService } from 'admin/linked/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useCommerceMenuRemove = () => {
    /* states */
    const { commerceId } = useParams<{ commerceId: string }>();

    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const {
        /* states */
        selectedTitleToRemove,
        /* functions */
        getMenuLinkedList,
        handleUnselectTitleToRemove,
    } = useCommerceMenuContext();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleCancelCommerceMenuRemove = () => handleUnselectTitleToRemove();

    const handleCommerceMenuRemove = async () => {
        showLoader();

        const service = await updateLinkedProductListService(linkedCommerceSettings?.commerceId ?? commerceId ?? '', {
            titleId: selectedTitleToRemove?.titleId ?? 0,
            productCollection: [],
        });

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

        handleCancelCommerceMenuRemove();

        getMenuLinkedList();
    };

    return { handleCancelCommerceMenuRemove, handleCommerceMenuRemove };
};
