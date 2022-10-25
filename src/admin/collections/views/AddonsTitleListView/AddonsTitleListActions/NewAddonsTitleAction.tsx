/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { NavItem } from 'admin/core';
/* assets */
import { MdStore } from 'react-icons/md';

const NewAddonsTitleAction = () => {
    const { t } = useTranslation();

    return <NavItem icon={<MdStore />} text={t('views.addonstitlelist.list.create')} to="create" />;
};

export default memo(NewAddonsTitleAction);
