/* react */
import { memo } from 'react';
/* context */
import { useLinkTitleContext } from '../LinkTitle.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { FieldSet, useAdminLang } from 'admin/core';
/* assets */
import { MdRestaurantMenu } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './LinkTitle.module.scss';

const LinkTitle = () => {
    const {
        /* states */
        /* functions */
        cancelLinkMenu,
        /* props */
        chooseTitleProps,
    } = useLinkTitleContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.LinkTitle}>
            <form onSubmit={event => event.preventDefault()}>
                <div className={styles.Header} title={translate('linkmenu.title')}>
                    <i>
                        <MdRestaurantMenu />
                    </i>

                    <Legend hasDots>{translate('linkmenu.title')}</Legend>
                </div>

                <div className={styles.Content}>
                    <FieldSet {...chooseTitleProps} />
                </div>

                <div className={styles.Actions}>
                    <Button
                        type="button"
                        title={translate('actions.cancel')}
                        onClick={cancelLinkMenu}
                        className={ButtonStyles.OutlineNone}>
                        <Legend hasDots justify="center">
                            {translate('actions.cancel')}
                        </Legend>
                    </Button>

                    <Button type="button" title={translate('actions.save')} className={ButtonStyles.FillSecondary}>
                        <Legend hasDots justify="center">
                            {translate('actions.save')}
                        </Legend>
                    </Button>
                </div>
            </form>
        </PanelLayout>
    );
};

export default memo(LinkTitle);
