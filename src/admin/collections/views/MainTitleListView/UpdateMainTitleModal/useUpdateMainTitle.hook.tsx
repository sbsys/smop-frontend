/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';

interface UpdateMainTitleFormData {}

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

    return {};
};
