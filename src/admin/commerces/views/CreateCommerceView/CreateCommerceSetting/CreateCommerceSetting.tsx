/* react */
import { memo } from 'react';
/* custom hook */
import { useCreateCommerceSetting } from './useCreateCommerceSetting.hook';
/* components */
import { Legend } from 'shared/components';
import { FieldSet, useAdminLang } from 'admin/core';
/* styles */
import styles from './CreateCommerceSetting.module.scss';

const CreateCommerceSetting = () => {
    const { createCommerceSettingFields } = useCreateCommerceSetting();

    const { translate } = useAdminLang();

    return (
        <div className={styles.Setting}>
            <h2 title={translate('createcommerce.settings')}>
                <Legend hasDots>{translate('createcommerce.settings')}</Legend>
            </h2>

            <div className={styles.Content}>
                {createCommerceSettingFields.map((field, index) => (
                    <FieldSet {...field} key={index} />
                ))}
            </div>
        </div>
    );
};

export default memo(CreateCommerceSetting);
