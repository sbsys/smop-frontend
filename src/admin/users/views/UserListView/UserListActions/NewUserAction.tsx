/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { NavItem } from 'admin/core';
/* assets */
import { MdSupervisedUserCircle } from 'react-icons/md';

const NewUserAction = () => {
    const { t } = useTranslation();

    return <NavItem icon={<MdSupervisedUserCircle />} text={t('views.userlist.list.create')} to="create" />;
};

export default memo(NewUserAction);
