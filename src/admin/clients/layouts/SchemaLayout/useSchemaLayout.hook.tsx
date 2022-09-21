/* react */
import { useParams } from 'react-router-dom';
/* props */
import { SchemaLayoutContextProps } from './SchemaLayout.props';

export const useSchemaLayout = () => {
    /* states */
    const { schema } = useParams<{ schema: string }>();

    console.log(schema);

    /* context */
    const context: SchemaLayoutContextProps = {};

    return { context };
};
