/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useAddonsTitle } from './useAddonsTitle.hook';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* layouts */
import { ModalLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { format } from 'date-fns';
import { classNames } from 'shared/utils';
/* assets */
import { MdCheck, MdClose, MdInfo } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './AddonsTitle.module.scss';

const AddonsTitleModal = () => {
    const {
        /* states */
        selectedTitle,
        /* functions */
        handleUnselectTitle,
    } = useAddonsTitleListContext();

    const { productList } = useAddonsTitle();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={selectedTitle !== null} rowAlignment="center" colAlignment="center" hasIndentation>
            <PanelLayout orientation="col" className={styles.AddonsTitle}>
                <div className={styles.Header} title={t('views.addonstitlelist.detail.title')}>
                    <i>
                        <MdInfo />
                    </i>

                    <Legend hasDots>{t('views.addonstitlelist.detail.title')}</Legend>
                </div>

                <PanelLayout orientation="col" className={styles.Content}>
                    <div className={styles.Boolean}>
                        <Legend hasDots className={styles.Title}>
                            {t('views.addonstitlelist.detail.multilanguage')}
                        </Legend>

                        <i
                            className={classNames(
                                styles.Icon,
                                selectedTitle?.multiLanguage ? styles.IconActive : styles.IconInactive
                            )}>
                            {selectedTitle?.multiLanguage ? <MdCheck /> : <MdClose />}
                        </i>
                    </div>

                    <Legend hasDots title={t('views.addonstitlelist.detail.reference')} className={styles.Title}>
                        {t('views.addonstitlelist.detail.reference')}
                    </Legend>

                    {selectedTitle?.multiLanguage ? (
                        selectedTitle?.titleCollection.map((reference, index) => (
                            <Legend key={index} title={reference.ref}>
                                <span className={styles.Title}>{reference.lang.toUpperCase()}: </span>

                                <span>{reference.ref}</span>
                            </Legend>
                        ))
                    ) : (
                        <Legend title={selectedTitle?.defaultTitle}>{selectedTitle?.defaultTitle}</Legend>
                    )}

                    <Legend hasDots title={t('views.addonstitlelist.detail.created')} className={styles.Title}>
                        {t('views.addonstitlelist.detail.created')}
                    </Legend>

                    <Legend title={!selectedTitle?.createdAt ? '' : format(selectedTitle.createdAt, 'MMM do, yyyy')}>
                        {!selectedTitle?.createdAt ? '' : format(selectedTitle.createdAt, 'MMM do, yyyy')}
                    </Legend>

                    {productList.length > 0 && (
                        <>
                            <Legend hasDots title={t('views.addonstitlelist.detail.products')} className={styles.Title}>
                                {t('views.addonstitlelist.detail.products')}
                            </Legend>

                            <ScrollLayout orientation="col">
                                <ul className={styles.List}>
                                    {productList.map((item, index) => (
                                        <li key={index}>
                                            <Legend hasDots>
                                                {item.markAsAddon && <span>(addon) </span>}

                                                <span>{item.defaultReference}</span>
                                            </Legend>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollLayout>
                        </>
                    )}
                </PanelLayout>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        className={ButtonStyles.OutlineNone}
                        title={t('views.addonstitlelist.detail.actions.cancel')}
                        onClick={handleUnselectTitle}>
                        <Legend hasDots justify="center">
                            {t('views.addonstitlelist.detail.actions.cancel')}
                        </Legend>
                    </Button>
                </div>
            </PanelLayout>
        </ModalLayout>
    );
};

export default memo(AddonsTitleModal);
