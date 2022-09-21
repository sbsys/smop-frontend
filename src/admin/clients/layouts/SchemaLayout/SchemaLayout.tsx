/* react */
import { memo } from 'react';
/* context */
import { SchemaLayoutProvider } from './SchemaLayout.context';
/* custom hook */
import { useSchemaLayout } from './useSchemaLayout.hook';
/* components */
import { Schema } from './Schema';

const SchemaLayout = () => {
    const { context } = useSchemaLayout();

    return (
        <SchemaLayoutProvider context={context}>
            <Schema />
        </SchemaLayoutProvider>
    );
};

export default memo(SchemaLayout);
