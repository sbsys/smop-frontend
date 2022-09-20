import { TenantItemDTO } from '../types';
import { tenantSerializer } from './tenant.serializer';

export const tenantListSerializer = (data: any): TenantItemDTO[] => [
    ...(data.schemas as any[]).map(item => tenantSerializer(item)),
];
