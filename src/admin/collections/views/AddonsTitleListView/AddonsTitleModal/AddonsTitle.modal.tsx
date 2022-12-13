/* react */
import { memo } from 'react';
/* custom hook */
import { useAddonsTitle } from './useAddonsTitle.hook';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* hooks */
import { useAdminLang } from 'admin/core';
/* layouts */
import { ModalLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { ComplementType } from 'admin/collections/types';
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

    const { translate } = useAdminLang();

    return (
        <ModalLayout isVisible={selectedTitle !== null} rowAlignment="center" colAlignment="center" hasIndentation>
            <PanelLayout orientation="col" className={styles.AddonsTitle}>
                <div className={styles.Header} title={translate('addontitledetail.title')}>
                    <i>
                        <MdInfo />
                    </i>

                    <Legend hasDots>{translate('addontitledetail.title')}</Legend>
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

                    <Legend hasDots title={translate('addontitledetail.collection')} className={styles.Title}>
                        {translate('addontitledetail.collection')}
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

                    <Legend hasDots title={translate('addontitledetail.type')} className={styles.Title}>
                        {translate('addontitledetail.type')}
                    </Legend>

                    <Legend title={translate(`types.${selectedTitle?.type as ComplementType}`)}>
                        {translate(`types.${selectedTitle?.type as ComplementType}`)}
                    </Legend>

                    {productList.length > 0 && (
                        <>
                            <Legend hasDots title={translate('addontitledetail.products')} className={styles.Title}>
                                {translate('addontitledetail.products')}
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

export default memo(AddonsTitleModal);
