/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useCreateCommerceSetting } from './useCreateCommerceSetting.hook';
/* components */
import { Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* styles */
import styles from './CreateCommerceSetting.module.scss';

const CreateCommerceSetting = () => {
    const { createCommerceSettingFields } = useCreateCommerceSetting();

    const { t } = useTranslation();

    return (
        <div className={styles.Setting}>
            <h2 title={t('views.createcommerce.setting.header')}>
                <Legend hasDots>{t('views.createcommerce.setting.header')}</Legend>
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
