/* context */
import { useUserListContext } from '../UserList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { updateStatusService } from 'admin/users/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useUpdateUserState = () => {
    /* states */
    const {
        /* states */
        selectedUserToUpdateState,
        /* functions */
        getUserList,
        handleUnselectUserToUpdateState,
    } = useUserListContext();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleCancelUpdateUserState = () => handleUnselectUserToUpdateState();

    const handleUpdateUserState = async () => {
        showLoader();

        const service = await updateStatusService(selectedUserToUpdateState?.userId ?? '');

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

        handleCancelUpdateUserState();

        getUserList();
    };

    return { handleCancelUpdateUserState, handleUpdateUserState };
};
