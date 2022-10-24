/*  */
import { mainTitleListItemSerializer } from './title.serializer';
import { MainTitleListItemDTO } from '../types';

export const mainTitleListSerializer = (data: any): MainTitleListItemDTO[] => [
    ...(data.titles as any[]).map(item => mainTitleListItemSerializer(item)),
];
