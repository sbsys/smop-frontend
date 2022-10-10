import { CountryListItemDTO, DepartmentDTO, StateListItemDTO } from '../types';

export const countrySerializer = (data: any): CountryListItemDTO => {
    return { ...data };
};

export const countryListSerializer = (data: any): CountryListItemDTO[] => {
    return [...data.countries.map((item: any) => countrySerializer(item))];
};

export const stateSerializer = (data: any): StateListItemDTO => {
    return { ...data, code: data.state_code };
};

export const departmentListSerializer = (data: any): DepartmentDTO => {
    return {
        states: data.info[0].states.map((item: any) => stateSerializer(item)),
        timezones: data.info[0].timezones,
    };
};
