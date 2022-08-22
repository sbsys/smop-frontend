/* react */
import { memo } from 'react';
/* layouts */
import { ModalLayout } from 'shared/layouts';
/* components */
import { ThreeCircles } from 'react-loader-spinner';
/* hooks */
import { useLoader } from 'shared/hooks';
/* styles */
import styles from './AdminLoader.module.scss';

const AdminLoader = () => {
    const { isLoading } = useLoader();

    return (
        <ModalLayout isVisible={isLoading} hasIndentation rowAlignment="center" colAlignment="center">
            <ThreeCircles color="currentColor" wrapperClass={styles.AdminLoader} visible={true} />
        </ModalLayout>
    );
};

export default memo(AdminLoader);
