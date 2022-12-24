/* react */
import { memo, useEffect } from 'react';
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

    useEffect(() => {
        document.body.classList.add(styles.SchemaTheme);

        return () => {
            document.body.classList.remove(styles.SchemaTheme);
        };
    }, []);

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
