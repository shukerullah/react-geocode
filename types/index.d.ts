export interface GeocodeOptions {
    key?: string;
    language?: string;
    region?: string;
    components?: string;
    bounds?: string;
    result_type?: string;
    location_type?: string;
}
export declare function setKey(key: string): void;
export declare function setLanguage(language: string): void;
export declare function setRegion(region: string): void;
export declare function setComponents(components: string): void;
export declare function setBounds(bounds: string): void;
export declare function setResultType(resultType: string): void;
export declare function setLocationType(locationType: string): void;
export declare function geocode(address: string, options?: GeocodeOptions): Promise<any>;
export declare function reverseGeocode(lat: number, lng: number, options?: GeocodeOptions): Promise<any>;
export declare function fromLatLng(lat: number, lng: number, key?: string, language?: string, region?: string, location_type?: string): Promise<any>;
export declare function fromAddress(address: string, key?: string, language?: string, region?: string): Promise<any>;
