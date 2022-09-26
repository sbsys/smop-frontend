/* react */
import { memo } from 'react';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdEdit } from 'react-icons/md';
import { TenantCoverSrc, TenantProfileSrc } from 'assets';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './BrandingSection.module.scss';

const BrandingSection = () => {
    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
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
    );
};

export default memo(BrandingSection);
