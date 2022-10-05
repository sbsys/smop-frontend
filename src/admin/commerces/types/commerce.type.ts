export type CommerceState = 'active' | 'inactive';

export interface CommerceListItemDTO {
    id: number;
    name: string;
    isActive: CommerceState;
    createdAt: Date;
}
