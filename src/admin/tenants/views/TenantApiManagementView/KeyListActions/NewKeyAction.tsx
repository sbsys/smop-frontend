/* react */
import { memo } from 'react';
/* components */
import { NavItem, useAdminLang } from 'admin/core';
/* assets */
import { HiKey } from 'react-icons/hi';

export const NewKeyAction = () => {
    const { translate } = useAdminLang();

    return <NavItem icon={<HiKey />} text={translate('actions.new')} to="create" />;
};

export default memo(NewKeyAction);
