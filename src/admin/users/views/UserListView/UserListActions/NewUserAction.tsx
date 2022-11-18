/* react */
import { memo } from 'react';
/* components */
import { NavItem, useAdminLang } from 'admin/core';
/* assets */
import { MdSupervisedUserCircle } from 'react-icons/md';

const NewUserAction = () => {
    const { translate } = useAdminLang();

    return <NavItem icon={<MdSupervisedUserCircle />} text={translate('actions.new')} to="create" />;
};

export default memo(NewUserAction);
