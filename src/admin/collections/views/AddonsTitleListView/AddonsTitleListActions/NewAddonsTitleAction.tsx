/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* store */
import { selectAuthStore } from 'admin/auth';
/* components */
import { NavItem, useAdminSelector } from 'admin/core';
/* assets */
import { MdStore } from 'react-icons/md';

const NewAddonsTitleAction = () => {
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const { t } = useTranslation();

    return (
        <NavItem
            icon={<MdStore />}
            isDisabled={profiles !== 'admin'}
            text={t('views.addonstitlelist.list.create')}
            to="create"
        />
    );
};

export default memo(NewAddonsTitleAction);
