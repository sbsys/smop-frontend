/* react */
import { memo } from 'react';
/* components */
import { NavItem, useAdminLang } from 'admin/core';
/* assets */
import { MdMenuBook } from 'react-icons/md';

const NewMenuAction = () => {
    const { translate } = useAdminLang();

    return <NavItem icon={<MdMenuBook />} text={translate('actions.new')} to="link" />;
};

export default memo(NewMenuAction);
