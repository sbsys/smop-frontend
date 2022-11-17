/* react */
import { memo } from 'react';
/* context */
import { useUpdateLinkedTitleContext } from '../UpdateLinkedTitle.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateLinkedTitle.module.scss';

const UpdateLinkedTitle = () => {
    const {
        /* states */
        linkedTitle,
        linkedTitleFieldProps,
        /* functions */
        cancelUpdateLinkedMenu,
        handleUpdateLinkedMenu,
    } = useUpdateLinkedTitleContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.UpdateLinkedTitle}>
            <form onSubmit={handleUpdateLinkedMenu}>
                <div className={styles.Header} title={translate('menuedit.title')}>
                    <i>
                        <MdEdit />
                    </i>

                    <Legend hasDots>{translate('menuedit.title')}</Legend>
                </div>

                <PanelLayout orientation="col" className={styles.Content}>
                    <div>
                        <Legend hasDots className={styles.Title} title={translate('headers.name')}>
                            {translate('headers.name')}:
                        </Legend>

                        <Legend title={linkedTitle?.defaultTitle}>{linkedTitle?.defaultTitle}</Legend>
                    </div>

                    <ScrollLayout orientation="col">
                        <div className={styles.List}>
                            {linkedTitleFieldProps.map((field, index) => (
                                <FieldSet {...field} key={index} />
                            ))}
                        </div>
                    </ScrollLayout>
                </PanelLayout>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        title={translate('actions.cancel')}
                        onClick={cancelUpdateLinkedMenu}
                        className={ButtonStyles.OutlineNone}>
                        <Legend hasDots justify="center">
                            {translate('actions.cancel')}
                        </Legend>
                    </Button>

                    <Button type="submit" title={translate('actions.update')} className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {translate('actions.update')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </PanelLayout>
    );
};

export default memo(UpdateLinkedTitle);
