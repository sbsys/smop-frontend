/* react */
import { memo } from 'react';
/* custom hook */
import { useCreateUser } from './useCreateUser.hook';
/* context */
import { CreateUserProvider } from './CreateUser.Context';
/* components */
import { CreateUser } from './CreateUser';

const CreateUserView = () => {
    const { context } = useCreateUser();

    return (
        <CreateUserProvider context={context}>
            <CreateUser />
        </CreateUserProvider>
    );
};

export default memo(CreateUserView);
