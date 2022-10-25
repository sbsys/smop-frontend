/*  */
import { mainTitleListItemSerializer, titleListItemSerializer } from './title.serializer';
import { MainTitleListItemDTO, TitleListItemDTO } from '../types';

export const mainTitleListSerializer = (data: any): MainTitleListItemDTO[] => [
    ...(data.titles as any[]).map(item => mainTitleListItemSerializer(item)),
];

export const titleListSerializer = (data: any): TitleListItemDTO[] => [
    ...(data.titles as any[]).map(item => titleListItemSerializer(item)),
];
