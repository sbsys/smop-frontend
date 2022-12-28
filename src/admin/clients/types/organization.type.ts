export type BrandingFile = {
    isCover: boolean;
    url: string;
};

export type TypeChargeKey = 'percentage' | 'amount';

export type TypeChargeSymbol = '%' | '$';

export const TypeChargeKeyToSymbol: Record<TypeChargeKey, TypeChargeSymbol> = {
    percentage: '%',
    amount: '$',
};

export const TypeChargeSymbolToKey: Record<TypeChargeSymbol, TypeChargeKey> = {
    '%': 'percentage',
    $: 'amount',
};

export type ChargeDescription = {
    enabled: boolean;
    type: TypeChargeKey;
    symbol: TypeChargeSymbol;
    value: number;
};

export type ServicePhone = {
    phone: string;
};

export interface CommerceListItem {
    commerceId: string;
    referenceName: string;
    address: string;
    minAmountDelivery: number;
    orderOnline: boolean;
    /* type charge */
    typeCharge: ChargeDescription[];
    servicePhones: ServicePhone[];
    url: string;
}

export interface OrganizationDetail {
    /* general */
    organizationId: string;
    organizationName: string;
    ownerReference: string;
    schema: string;
    /* files */
    files: BrandingFile[];
    /* commerces */
    commerces: CommerceListItem[];
}
