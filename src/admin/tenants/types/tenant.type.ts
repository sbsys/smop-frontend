export type TenantState = 'active' | 'inactive';

export interface TenantCreateDTO {
    email: string;
    password: string;
    phone: string;
    schema: string;
}

export interface TenantItemDTO extends Omit<TenantCreateDTO, 'password'> {
    id: number;
    created: Date;
    state: TenantState;
}
