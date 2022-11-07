/* react */
import { memo } from 'react';

/* store */
import { selectAuthStore } from 'admin/auth';
/* components */
import { NavItem, useAdminLang, useAdminSelector } from 'admin/core';
/* assets */
import { MdStore } from 'react-icons/md';

const NewMainTitleAction = () => {
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const { translate } = useAdminLang();

    return <NavItem icon={<MdStore />} isDisabled={profiles !== 'admin'} text={translate('actions.new')} to="create" />;
};

export default memo(NewMainTitleAction);
