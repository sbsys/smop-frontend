export type CommerceKey = {
    enseckeyId: string;
    commerceId: string;
};

export type KeyBelongsCommerce = {
    referenceName: string;
    commerceKeys: CommerceKey;
};

export interface GatewayListItem {
    secretId: string;
    referenceKey: string;
    hash: string;
    createdAt: Date;
    keyBelongsCommerce: KeyBelongsCommerce[];
}
