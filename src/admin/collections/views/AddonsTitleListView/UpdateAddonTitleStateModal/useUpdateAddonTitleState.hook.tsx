/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { updateAddonTitleService } from 'admin/collections/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useUpdateAddonTitleState = () => {
    /* states */
    const {
        /* states */
        selectedTitleToUpdateState,
        /* functions */
        getTitleList,
        handleUnselectTitleToUpdateState,
    } = useAddonsTitleListContext();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleCancelUpdateStateAddonTitle = () => handleUnselectTitleToUpdateState();

    const handleUpdateStateAddonTitle = async () => {
        showLoader();

        const service = await updateAddonTitleService(selectedTitleToUpdateState?.titleId ?? 0, {
            defaultTitle: selectedTitleToUpdateState?.defaultTitle ?? '',
            multiLanguage: selectedTitleToUpdateState?.multiLanguage ?? true,
            titleCollection: selectedTitleToUpdateState?.titleCollection ?? [],
            isActive: selectedTitleToUpdateState?.isActive !== 'active',
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

        handleCancelUpdateStateAddonTitle();

        getTitleList();
    };

    return { handleCancelUpdateStateAddonTitle, handleUpdateStateAddonTitle };
};
