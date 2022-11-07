/* react */
import { memo } from 'react';
/* custom hook */
import { useMainTitle } from './useMainTitle.hook';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* layouts */
import { ModalLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={selectedTitle !== null} rowAlignment="center" colAlignment="center" hasIndentation>
            <PanelLayout orientation="col" className={styles.MainTitle}>
                <div className={styles.Header} title={translate('maintitledetail.title')}>
                    <i>
                        <MdInfo />
                    </i>

                    <Legend hasDots>{translate('maintitledetail.title')}</Legend>
                </div>

                <PanelLayout orientation="col" className={styles.Content}>
                    <div className={styles.Boolean}>
                        <Legend hasDots className={styles.Title}>
                            {translate('commons.multilanguage')}
                        </Legend>

                        <i
                            className={classNames(
                                styles.Icon,
                                selectedTitle?.multiLanguage ? styles.IconActive : styles.IconInactive
                            )}>
                            {selectedTitle?.multiLanguage ? <MdCheck /> : <MdClose />}
                        </i>
                    </div>

                    <Legend hasDots title={translate('maintitledetail.collection')} className={styles.Title}>
                        {translate('maintitledetail.collection')}
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

                    <Legend hasDots title={translate('maintitledetail.created')} className={styles.Title}>
                        {translate('maintitledetail.created')}
                    </Legend>

                    <Legend title={!selectedTitle?.createdAt ? '' : format(selectedTitle.createdAt, 'MMM do, yyyy')}>
                        {!selectedTitle?.createdAt ? '' : format(selectedTitle.createdAt, 'MMM do, yyyy')}
                    </Legend>

                    {productList.length > 0 && (
                        <>
                            <Legend hasDots title={translate('maintitledetail.products')} className={styles.Title}>
                                {translate('maintitledetail.products')}
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
                        title={translate('actions.close')}
                        onClick={handleUnselectTitle}>
                        <Legend hasDots justify="center">
                            {translate('actions.close')}
                        </Legend>
                    </Button>
                </div>
            </PanelLayout>
        </ModalLayout>
    );
};

export default memo(MainTitleModal);
