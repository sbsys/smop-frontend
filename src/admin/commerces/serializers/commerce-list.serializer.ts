/*  */
import { commerceListItemSerializer } from './commerce.serializer';
import { CommerceListItemDTO } from '../types';

export const commerceListSerializer = (data: any): CommerceListItemDTO[] => [
    ...(data.commerces as any[]).map(item => commerceListItemSerializer(item)),
];
