/* react */
import { memo } from 'react';
/* store */
import { selectAuthStore } from 'admin/auth';
/* components */
import { NavItem, useAdminLang, useAdminSelector } from 'admin/core';
/* assets */
import { MdChecklist } from 'react-icons/md';

const NewProductAction = () => {
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const { translate } = useAdminLang();

    return (
        <NavItem icon={<MdChecklist />} isDisabled={profiles !== 'admin'} text={translate('actions.new')} to="create" />
    );
};

export default memo(NewProductAction);
