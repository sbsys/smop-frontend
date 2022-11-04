/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* store */
import { selectAuthStore } from 'admin/auth';
/* components */
import { NavItem, useAdminSelector } from 'admin/core';
/* assets */
import { MdChecklist } from 'react-icons/md';

const NewProductAction = () => {
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const { t } = useTranslation();

    return (
        <NavItem
            icon={<MdChecklist />}
            isDisabled={profiles !== 'admin'}
            text={t('views.productlist.list.create')}
            to="create"
        />
    );
};

export default memo(NewProductAction);
