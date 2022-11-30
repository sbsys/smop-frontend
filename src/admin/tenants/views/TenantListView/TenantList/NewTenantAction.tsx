/* react */
import { memo } from 'react';
/* components */
import { NavItem, useAdminLang } from 'admin/core';
/* assets */
import { MdDashboardCustomize } from 'react-icons/md';

const NewTenantAction = () => {
    const { translate } = useAdminLang();

    return <NavItem icon={<MdDashboardCustomize />} text={translate('actions.new')} to="create" />;
};

export default memo(NewTenantAction);
