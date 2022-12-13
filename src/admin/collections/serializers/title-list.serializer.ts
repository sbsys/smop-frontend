/*  */
import { complementTitleListItemSerializer, mainTitleListItemSerializer } from './title.serializer';
import { ComplementTitleListItemDTO, MainTitleListItemDTO } from '../types';

export const mainTitleListSerializer = (data: any): MainTitleListItemDTO[] => {
    return [...(data.titles as any[]).map(item => mainTitleListItemSerializer(item))];
};

export const complementTitleListSerializer = (data: any): ComplementTitleListItemDTO[] => {
    const titles = data.titles;

    return [
        ...titles.combos.map((combo: any) => ({ ...complementTitleListItemSerializer(combo), type: 'combo' })),
        ...titles.multiples.map((multiple: any) => ({
            ...complementTitleListItemSerializer(multiple),
            type: 'multiple',
        })),
        ...titles.singles.map((single: any) => ({ ...complementTitleListItemSerializer(single), type: 'single' })),
    ];
};
