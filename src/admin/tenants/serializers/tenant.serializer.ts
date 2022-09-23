/* types */
import { TenantItemDTO } from '../types';

export const tenantSerializer = (data: any): TenantItemDTO => {
    return {
        id: Number.parseInt(data.id ?? '0'),
        name: data.fullname,
        phone: data.phoneNumber,
        email: data.email,
        schema: data.schemaName ?? data.schema,
        created: new Date(data.createdAt),
        state: data.isActive ? 'active' : 'inactive',
    };
};
