/*  */
import { complementTitleListItemSerializer, mainTitleListItemSerializer } from './title.serializer';
import { ComplementTitleListItemDTO, MainTitleListItemDTO } from '../types';

export const mainTitleListSerializer = (data: any): MainTitleListItemDTO[] => {
    return [...(data.titles as any[]).map(item => mainTitleListItemSerializer(item))];
};

export const complementTitleListSerializer = (data: any): ComplementTitleListItemDTO[] => {
    const titles = data.titles;

    const combos = Array.isArray(titles.combos)
        ? titles.combos.map((combo: any) => ({ ...complementTitleListItemSerializer(combo), type: 'combo' }))
        : [];

    const multiples = Array.isArray(titles.multiples)
        ? titles.multiples.map((multiple: any) => ({
              ...complementTitleListItemSerializer(multiple),
              type: 'multiple',
          }))
        : [];

    const singles = Array.isArray(titles.singles)
        ? titles.singles.map((single: any) => ({ ...complementTitleListItemSerializer(single), type: 'single' }))
        : [];

    return [...combos, ...multiples, ...singles];
};
