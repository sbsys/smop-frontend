/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../CommerceDetail.module.scss';
import styles from './CommerceReferenceSection.module.scss';

const CommerceReferenceSection = () => {
    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.commercedetail.referencesection.title')}>
                    <Legend hasDots>{t('views.commercedetail.referencesection.title')}</Legend>
                </h2>

                <Button className={ButtonStyles.OutlineNone} title={t('views.commercedetail.referencesection.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>
        </section>
    );
};

export default memo(CommerceReferenceSection);
