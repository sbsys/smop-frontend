/* react */
import { memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
/* utils */
import { offCustomEvent, onCustomEvent } from 'shared/utils';

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const password_recovery = () => {
            navigate('/admin/security', { replace: true });
        };

        onCustomEvent('password_recovery', password_recovery);

        return () => {
            offCustomEvent('password_recovery', password_recovery);
        };
    }, [navigate]);

    return <Outlet />;
};

export default memo(AdminLayout);
