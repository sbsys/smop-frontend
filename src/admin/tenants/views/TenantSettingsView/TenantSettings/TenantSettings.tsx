/* react */
import { memo } from 'react';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdEdit } from 'react-icons/md';
import { TenantCoverSrc, TenantProfileSrc } from 'assets';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './TenantSettings.module.scss';

const TenantSettings = () => {
    return (
        <ScrollLayout classNameContent={styles.Settings} orientation="col">
            <h1>
                <Legend hasDots>Organization Settings</Legend>
            </h1>

            <section>Owner reference & Organization name</section>

            <section>Language & decimals</section>

            <section className={styles.Section}>
                <div className={styles.Title}>
                    <h2>
                        <Legend hasDots>Branding</Legend>
                    </h2>

                    <Button className={ButtonStyles.OutlineNone}>
                        <i>
                            <MdEdit />
                        </i>
                    </Button>
                </div>

                <div className={styles.Branding}>
                    <img src={TenantCoverSrc} alt="Tenant cover" />

                    <img src={TenantProfileSrc} alt="Tenant profile" />
                </div>
            </section>
        </ScrollLayout>
    );
};

export default memo(TenantSettings);
