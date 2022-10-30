/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { NavItem } from 'admin/core';
/* assets */
import { MdChecklist } from 'react-icons/md';

const NewProductAction = () => {
    const { t } = useTranslation();

    return <NavItem icon={<MdChecklist />} text={t('views.productlist.list.create')} to="create" />;
};

export default memo(NewProductAction);
