/* react */
import { memo } from 'react';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './ReferenceSection.module.scss';

const ReferenceSection = () => {
    const {
        /* states */
        settings,
        showUpdateReference,
    } = useTenantSettingsContext();

    const { translate } = useAdminLang();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={translate('orgdetail.references')}>
                    <Legend hasDots>{translate('orgdetail.references')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    title={translate('actions.edit')}
                    onClick={showUpdateReference}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Reference}>
                <Legend hasDots>
                    <span className={styles.Title}>{translate('orgdetail.orgname')}: </span>

                    <span>{settings?.organizationName}</span>
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{translate('orgdetail.owner')}: </span>

                    <span>{settings?.ownerReference}</span>
                </Legend>
            </div>
        </section>
    );
};

export default memo(ReferenceSection);
