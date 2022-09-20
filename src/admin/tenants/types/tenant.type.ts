export type TenantState = 'active' | 'inactive';

export interface CreateTenantDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    schema: string;
}

export interface TenantItemDTO extends Omit<CreateTenantDTO, 'password'> {
    id: number;
    created: Date;
    state: TenantState;
}
