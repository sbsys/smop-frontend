export interface CountryListItemDTO {
    cca3: string;
    name: string;
}

export interface CityListItemDTO {
    id: number;
    latitude: string;
    longitude: string;
    name: string;
}

export interface StateListItemDTO {
    cities: CityListItemDTO[];
    id: number;
    latitude: string;
    longitude: string;
    name: string;
    code: string;
    type: string;
}

export interface TimezoneListItemDTO {
    abbreviation: string;
    gmtOffset: number;
    gmtOffsetName: string;
    tzName: string;
    zoneName: string;
}

export interface DepartmentDTO {
    states: StateListItemDTO[];
    timezones: TimezoneListItemDTO[];
}
