/* react */
import { memo } from 'react';
/* store */
import { selectAuthStore } from 'admin/auth';
/* components */
import { NavItem, useAdminLang, useAdminSelector } from 'admin/core';
/* assets */
import { MdStore } from 'react-icons/md';

const NewCommerceAction = () => {
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const { translate } = useAdminLang();

    if (profiles !== 'admin') return null;

    return <NavItem icon={<MdStore />} text={translate('actions.new')} to="../create" />;
};

export default memo(NewCommerceAction);
