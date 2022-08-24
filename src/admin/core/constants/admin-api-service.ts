import axios from 'axios';

export const AdminApiService = axios.create({
    baseURL: `${process.env['REACT_APP_ADMIN_API_SERVICE']}${process.env['REACT_APP_ADMIN_API_VERSION']}`,
});
