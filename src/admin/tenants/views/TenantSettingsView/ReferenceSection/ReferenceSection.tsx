/* react */
import { memo } from 'react';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './ReferenceSection.module.scss';

const ReferenceSection = () => {
    const {
        /* states */
        showUpdateReference,
    } = useTenantSettingsContext();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title="">
                    <Legend hasDots>References</Legend>
                </h2>

                <Button className={ButtonStyles.OutlineNone} title="" onClick={showUpdateReference}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Reference}>
                <Legend hasDots>
                    <span className={styles.Title}>Organization name:</span> Las Primas SA
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>Owner:</span> Steven Joseph Bustillo López
                </Legend>
            </div>
        </section>
    );
};

export default memo(ReferenceSection);
