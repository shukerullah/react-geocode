export declare enum RequestType {
    ADDRESS = "address",
    LATLNG = "latlng",
    PLACE_ID = "place_id"
}
export declare enum OutputFormat {
    XML = "xml",
    JSON = "json"
}
export interface GeocodeOptions {
    key?: string;
    language?: string;
    region?: string;
    components?: string;
    bounds?: string;
    result_type?: string;
    location_type?: string;
    outputFormat: OutputFormat;
    enable_address_descriptor?: boolean;
}
export declare function setDefaults(options: GeocodeOptions): void;
export declare function setKey(key: string): void;
export declare function setLanguage(language: string): void;
export declare function setRegion(region: string): void;
export declare function setComponents(components: string): void;
export declare function setBounds(bounds: string): void;
export declare function setResultType(resultType: string): void;
export declare function setLocationType(locationType: string): void;
export declare function setOutputFormat(outputFormat: OutputFormat): void;
export declare function enableAddressDescriptor(enableAddressDescriptor: boolean): void;
export declare function geocode(requestType: RequestType | string, value: string, options?: GeocodeOptions): Promise<any>;
export declare function fromAddress(address: string, key?: string, language?: string, region?: string): Promise<any>;
export declare function fromPlaceId(placeId: string, key?: string, language?: string, region?: string): Promise<any>;
export declare function fromLatLng(lat: number, lng: number, key?: string, language?: string, region?: string, location_type?: string): Promise<any>;
