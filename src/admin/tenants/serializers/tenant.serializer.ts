/* types */
import { TenantItemDTO } from '../types';

export const tenantSerializer = (data: any): TenantItemDTO => ({
    id: Number.parseInt(data.id ?? '0'),
    name: data.fullname,
    phone: data.phone_number,
    email: data.email,
    schema: data.schema_name ?? data.schema,
    created: new Date(data.created_at),
    state: data.is_active ? 'active' : 'inactive',
});
