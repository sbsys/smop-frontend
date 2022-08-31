/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { NavItem } from 'admin/core';
/* assets */
import { MdDashboardCustomize } from 'react-icons/md';

const NewTenantAction = () => {
    const { t } = useTranslation();

    return <NavItem icon={<MdDashboardCustomize />} text={t('views.tenants.list.new')} to="new" />;
};

export default memo(NewTenantAction);
