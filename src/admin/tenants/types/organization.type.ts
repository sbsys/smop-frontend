export interface OrganizationInternationalization {
    id: number;
    abbreviation: string;
    flagpng: string;
    flagsvg: string;
    isAvailable: boolean;
    preferredLanguage: boolean;
}

export interface OrganizationFile {
    isCover: boolean;
    url: string;
}

export interface OrganizationSettingsDTO {
    organizationId: string;
    ownerReference: string;
    organizationName: string;
    multiLanguage: boolean;
    maxLangAllow: number;
    decimals: number;
    readySettings: boolean;
    internationalization: OrganizationInternationalization[];
    files: OrganizationFile[];
}
