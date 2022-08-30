import { NavItem } from 'admin/core';
import { memo } from 'react';
import { MdDashboardCustomize } from 'react-icons/md';

const NewTenantAction = () => {
    return <NavItem icon={<MdDashboardCustomize />} text="New Tenant" to="new" />;
};

export default memo(NewTenantAction);
