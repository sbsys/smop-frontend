/* react */
import { memo } from 'react';
/* components */
import { NavItem, useAdminLang } from 'admin/core';
/* assets */
import { MdRestaurantMenu } from 'react-icons/md';

const NewMenuAction = () => {
    const { translate } = useAdminLang();

    return <NavItem icon={<MdRestaurantMenu />} text={translate('actions.new')} to="link" />;
};

export default memo(NewMenuAction);
