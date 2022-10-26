/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { UpdateMainTitleFormData } from '../MainTitleList.props';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* services */
import { updateMainTitleService } from 'admin/collections/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useUpdateMainTitle = () => {
    /* states */
    const {
        /* states */
        selectedTitleToUpdate,
        /* functions */
        getTitleList,
        handleUnselectTitleToUpdate,
    } = useMainTitleListContext();

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setValue,
    } = useForm<UpdateMainTitleFormData>();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    /* functions */
    const handleCancelUpdateMainTitle = () => {
        reset();

        handleUnselectTitleToUpdate();
    };

    const handleUpdateMainTitle = handleSubmit(async data => {
        showLoader();

        const service = await updateMainTitleService(0, {
            ...data,
            serviceMode: selectedTitleToUpdate?.serviceMode ?? 0,
            servedOn: selectedTitleToUpdate?.servedOn ?? '-',
            isActive: selectedTitleToUpdate?.isActive === 'active',
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

        handleCancelUpdateMainTitle();

        getTitleList();
    });

    /* reactivity */

    /* props */

    const UpdateMainTitleFieldProps: FieldSetProps[] = [];

    return { handleCancelUpdateMainTitle, handleUpdateMainTitle, UpdateMainTitleFieldProps };
};
