/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* custom hook */
import { useMainTitle } from './useMainTitle.hook';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
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
import styles from './MainTitle.module.scss';

const MainTitleModal = () => {
    const {
        /* states */
        selectedTitle,
        /* functions */
        handleUnselectTitle,
    } = useMainTitleListContext();

    const { productList } = useMainTitle();

    const { t } = useTranslation();

    return (
        <ModalLayout isVisible={selectedTitle !== null} rowAlignment="center" colAlignment="center" hasIndentation>
            <PanelLayout orientation="col" className={styles.MainTitle}>
                <div className={styles.Header} title={t('views.maintitlelist.detail.title')}>
                    <i>
                        <MdInfo />
                    </i>

                    <Legend hasDots>{t('views.maintitlelist.detail.title')}</Legend>
                </div>

                <PanelLayout orientation="col" className={styles.Content}>
                    <div className={styles.Boolean}>
                        <Legend hasDots className={styles.Title}>
                            {t('views.maintitlelist.detail.multilanguage')}
                        </Legend>

                        <i
                            className={classNames(
                                styles.Icon,
                                selectedTitle?.multiLanguage ? styles.IconActive : styles.IconInactive
                            )}>
                            {selectedTitle?.multiLanguage ? <MdCheck /> : <MdClose />}
                        </i>
                    </div>

                    <Legend hasDots title={t('views.maintitlelist.detail.reference')} className={styles.Title}>
                        {t('views.maintitlelist.detail.reference')}
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

                    <Legend hasDots title={t('views.maintitlelist.detail.created')} className={styles.Title}>
                        {t('views.maintitlelist.detail.created')}
                    </Legend>

                    <Legend title={!selectedTitle?.createdAt ? '' : format(selectedTitle.createdAt, 'MMM do, yyyy')}>
                        {!selectedTitle?.createdAt ? '' : format(selectedTitle.createdAt, 'MMM do, yyyy')}
                    </Legend>

                    {productList.length > 0 && (
                        <>
                            <Legend hasDots title={t('views.maintitlelist.detail.products')} className={styles.Title}>
                                {t('views.maintitlelist.detail.products')}
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
                        title={t('views.maintitlelist.detail.actions.cancel')}
                        onClick={handleUnselectTitle}>
                        <Legend hasDots justify="center">
                            {t('views.maintitlelist.detail.actions.cancel')}
                        </Legend>
                    </Button>
                </div>
            </PanelLayout>
        </ModalLayout>
    );
};

export default memo(MainTitleModal);
