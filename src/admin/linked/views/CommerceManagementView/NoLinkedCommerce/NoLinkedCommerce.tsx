/* react */
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './NoLinkedCommerce.module.scss';
import { useCommerceManagementContext } from '../CommerceManagement.context';

const NoLinkedCommerce = () => {
    const {
        /* functions */
        getLinkedCommerceSettings,
    } = useCommerceManagementContext();

    const navigate = useNavigate();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.NoLinked}>
            <div>
                <Legend justify="center" title={translate('messages.nolinkedcommerce')}>
                    {translate('messages.nolinkedcommerce')}
                </Legend>

                <div>
                    <Button
                        className={ButtonStyles.OutlineNone}
                        onClick={() => navigate(-1)}
                        title={translate('actions.goback')}>
                        <Legend justify="center" hasDots>
                            {translate('actions.goback')}
                        </Legend>
                    </Button>

                    <Button
                        className={ButtonStyles.FillSecondary}
                        onClick={getLinkedCommerceSettings}
                        title={translate('actions.tryagain')}>
                        <Legend justify="center" hasDots>
                            {translate('actions.tryagain')}
                        </Legend>
                    </Button>
                </div>
            </div>
        </PanelLayout>
    );
};

export default memo(NoLinkedCommerce);
