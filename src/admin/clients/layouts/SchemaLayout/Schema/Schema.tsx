/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
/* context */
import { useSchemaLayoutContext } from '../SchemaLayout.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Appbar } from '../Appbar';
/* styles */
import styles from './Schema.module.scss';

const Schema = () => {
    const {
        /* states */
        isOrganization,
    } = useSchemaLayoutContext();

    return (
        <PanelLayout className={styles.Schema} orientation="col">
            <Appbar />

            {isOrganization ? (
                <PanelLayout className={styles.Content}>
                    <Outlet />
                </PanelLayout>
            ) : (
                <div>No organization</div>
            )}
        </PanelLayout>
    );
};

export default memo(Schema);
