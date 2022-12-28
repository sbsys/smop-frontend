/* react */
import { memo } from 'react';
/* store */
import { selectOrganization } from 'admin/clients/store';
/* context */
import { useSchemaLayoutContext } from '../SchemaLayout.context';
/* components */
import { ShoppingCart } from './ShoppingCart';
import { Actions } from './Actions';
/* hooks */
import { useClientsSelector } from 'admin/core';
/* assets */
/* styles */
import styles from './Appbar.module.scss';

const Appbar = () => {
    const {
        /* states */
        isOrganization,
    } = useSchemaLayoutContext();

    const org = useClientsSelector(selectOrganization);

    return (
        <div className={styles.Appbar}>
            {isOrganization && (
                <img
                    src={org?.files.find(file => !file.isCover)?.url}
                    alt={org?.organizationName}
                    crossOrigin="anonymous"
                />
            )}

            <ShoppingCart />

            <Actions />
        </div>
    );
};

export default memo(Appbar);
