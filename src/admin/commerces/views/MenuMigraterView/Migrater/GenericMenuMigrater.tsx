/* react */
import { memo } from 'react';
/* custom hook */
import { useGenericMigrater } from './useGenericMigrater.hook';

const GenericMenuMigrater = () => {
    const {} = useGenericMigrater();

    return <form onSubmit={event => event.preventDefault()}>GenericMenuMigrater</form>;
};

export default memo(GenericMenuMigrater);
