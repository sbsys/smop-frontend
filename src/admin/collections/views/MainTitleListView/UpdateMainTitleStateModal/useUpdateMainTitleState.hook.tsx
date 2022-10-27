/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { updateMainTitleService } from 'admin/collections/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useUpdateMainTitleState = () => {
    /* states */
    const {
        /* states */
        selectedTitleToUpdateState,
        /* functions */
        getTitleList,
        handleUnselectTitleToUpdateState,
    } = useMainTitleListContext();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleCancelUpdateStateMainTitle = () => handleUnselectTitleToUpdateState();

    const handleUpdateStateMainTitle = async () => {
        showLoader();

        const service = await updateMainTitleService(selectedTitleToUpdateState?.titleId ?? 0, {
            defaultTitle: selectedTitleToUpdateState?.defaultTitle ?? '',
            multiLanguage: selectedTitleToUpdateState?.multiLanguage ?? true,
            titleCollection: selectedTitleToUpdateState?.titleCollection ?? [],
            serviceMode: selectedTitleToUpdateState?.serviceMode ?? 1,
            servedOn: selectedTitleToUpdateState?.servedOn ?? '-',
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

        handleCancelUpdateStateMainTitle();

        getTitleList();
    };

    return { handleCancelUpdateStateMainTitle, handleUpdateStateMainTitle };
};
