/* react */
import { memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
/* utils */
import { offCustomEvent, onCustomEvent } from 'shared/utils';

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const reset_password = () => {
            navigate('/admin/security/reset-password', { replace: true });
        };

        onCustomEvent('reset_password', reset_password);

        return () => {
            offCustomEvent('reset_password', reset_password);
        };
    }, [navigate]);

    return <Outlet />;
};

export default memo(AdminLayout);
