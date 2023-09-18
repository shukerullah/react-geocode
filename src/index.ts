/**
 * Enum defining possible request types for geocoding.
 */
export enum RequestType {
  ADDRESS = 'address',   // Geocoding by address
  LATLNG = 'latlng',    // Geocoding by latitude and longitude
  PLACE_ID = 'place_id' // Geocoding by place ID
}

/**
 * Enum defining possible output formats for geocoding.
 */
export enum OutputFormat {
  XML = 'xml',   // Output format XML
  JSON = 'json'  // Output format JSON
}

/**
 * The URL of the Google Geocoding API.
 */
const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode";

/**
 * Options that can be passed to the geocoding requests.
 */
export interface GeocodeOptions {
  key?: string; // API key for the Google Maps Geocoding API.
  language?: string; // Language code for the response.
  region?: string; // Region code for the response.
  components?: string; // Component filtering for the response.
  bounds?: string; // Bounding box for the response.
  result_type?: string; // Result type filtering for the response.
  location_type?: string; // Location type filtering for the response.
  outputFormat: OutputFormat; // Desired output format (either XML or JSON)
  enable_address_descriptor: boolean; // Whether to include an address descriptor in the reverse geocoding response.
}

/**
 * Response object from the geocoding API.
 */
interface GeocodeResponse {
  status: string;
  results: GeocodeResult[];
  address_descriptor?: AddressDescriptor;
  plus_code?: PlusCode;
  error_message?: string;
}

/**
 * The query parameters for geocoding requests.
 */
interface GeocodeQueryParams extends GeocodeOptions {
  place_id?: string; // The plce id to geocode
  address?: string; // The address to geocode
  latlng?: string; // The latitude/longitude of the location to geocode
};

/**
 * Default options for the geocoding requests.
 */
const defaultOptions: GeocodeOptions = {
  outputFormat: OutputFormat.JSON,
  enable_address_descriptor: false
};

/**
 * Performs a geocoding request to the Google Geocoding API.
 * @function geocodeRequest
 * @async
 * @param {GeocodeQueryParams} queryParams - The query parameters for the geocoding request.
 * @returns {Promise<GeocodeResponse>} - A promise that resolves with the geocoding response object.
 * @throws {Error} - Throws an error if the geocoding request fails.
 */
async function geocodeRequest(
  queryParams: GeocodeQueryParams
): Promise<GeocodeResponse> {
  const queryString = new URLSearchParams(
    queryParams as any
  ).toString();
  const url = `${GOOGLE_GEOCODE_API}/${defaultOptions.outputFormat}?${queryString}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Geocoding failed: ${response.statusText}. Server returned status code ${response.status}.`
      );
    }

    const json = await response.json();
    const { status, error_message } = json;

    if (status === "OK") {
      return json;
    }

    throw new Error(
      `Geocoding failed: ${error_message}. Server returned status code ${status}.`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Geocoding request failed: ${error.message}`);
    }
    throw new Error(`Geocoding request failed with unknown error: ${error}`);
  }
}

/**
 * Sets the API key to use for geocoding requests.
 *
 * @param key - The API key to set.
 */
export function setKey(key: string): void {
  defaultOptions.key = key;
}

/**
 * Sets the language to use for geocoding requests.
 *
 * @param language - The language to set.
 */
export function setLanguage(language: string): void {
  defaultOptions.language = language;
}

/**
 * Sets the region code to use for geocoding requests.
 *
 * @param region - The region code to set.
 */
export function setRegion(region: string): void {
  defaultOptions.region = region;
}

/**
 * Sets the component filter to use for geocoding requests.
 *
 * @param components - The component filter to set.
 */
export function setComponents(components: string): void {
  defaultOptions.components = components;
}

/**
 * Sets the bounding box to use for geocoding requests.
 *
 * @param bounds - The bounding box to set.
 */
export function setBounds(bounds: string): void {
  defaultOptions.bounds = bounds;
}

/**
 * Sets the result type filter to use for geocoding requests.
 * One or more address types to return, separated by a pipe (|).
 * Possible values are "street_address", "route", "intersection", "political", "country",
 * "administrative_area_level_1", "administrative_area_level_2", "administrative_area_level_3",
 * "administrative_area_level_4", "administrative_area_level_5", "colloquial_area", "locality",
 * "ward", "sublocality", "neighborhood", "premise", "subpremise", "postal_code", "natural_feature",
 * "airport", "park", "point_of_interest", and "postal_code_prefix".
 *
 * @param resultType - The result type to set.
 */
export function setResultType(resultType: string): void {
  defaultOptions.result_type = resultType;
}

/**
 * Sets the location type filter to use for geocoding requests.
 * One or more location types to return. Possible values are "ROOFTOP",
 * "RANGE_INTERPOLATED", "GEOMETRIC_CENTER", "APPROXIMATE".
 *
 * @param locationType - The location type to set.
 */
export function setLocationType(locationType: string): void {
  defaultOptions.location_type = locationType;
}

/**
 * Sets the desired output format for geocoding requests. The format can be either XML or JSON.
 *
 * @param outputFormat - The desired output format (either OutputFormat.XML or OutputFormat.JSON).
 */
export function setOutputFormat(outputFormat: OutputFormat): void {
  defaultOptions.outputFormat = outputFormat;
}

/**
 * Sets whether to include an address descriptor in the reverse geocoding response.
 *
 * @param enableAddressDescriptor - A boolean parameter indicating whether to include the address descriptor.
 */
export function enableAddressDescriptor(enableAddressDescriptor: boolean): void {
  defaultOptions.enable_address_descriptor = enableAddressDescriptor;
}

/**
 * Sends a geocoding request to the Google Maps Geocoding API for a given address and returns the response.
 * @function geocode
 * @async
 * @param {RequestType} requestType - Identifier to specify the type of request (place_id, address, or latlng).
 * @param {string} value - The value to be used for geocoding (address, place_id, or latlng).
 * @param {GeocodeOptions} [options={}] - Additional options for the geocoding request.
 * @returns {Promise<GeocodeResponse>} - A promise that resolves with the geocoding response object.
 * @throws {Error} - Throws an error if the address is invalid or the geocoding request fails.
 */
export function geocode(
  requestType: RequestType | string,
  value: string,
  options?: GeocodeOptions
): Promise<any> {
  if (typeof requestType === 'string' && typeof value === 'string') {
    throw new Error('Both requestType and value are required and must be valid.');
  }
  const queryParams: GeocodeQueryParams = {
    ...defaultOptions,
    ...options,
    [requestType]: value
  };
  return geocodeRequest(queryParams);
}

/**
 * @deprecated Use `geocode` instead.
 * Usage: geocode("address", "Washington", *options)
 */
export function fromAddress(
  address: string,
  key?: string,
  language?: string,
  region?: string
) {
  const options: GeocodeOptions = {
    outputFormat: OutputFormat.JSON,
    enable_address_descriptor: false
  };
  if (key) {
    options.key = key;
  }
  if (language) {
    options.language = language;
  }
  if (region) {
    options.region = region;
  }
  return geocode(RequestType.ADDRESS, address, options);
}


/**
 * @deprecated use `geocode` instead
 * Usage: geocode("place_id", "ChIJd8BlQ2BZwokRAFUEcm_qrcA", *options)
 */
export function fromPlaceId(
  placeId: string,
  key?: string,
  language?: string,
  region?: string
) {
  const options: GeocodeOptions = {
    outputFormat: OutputFormat.JSON,
    enable_address_descriptor: false
  };
  if (key) {
    options.key = key;
  }
  if (language) {
    options.language = language;
  }
  if (region) {
    options.region = region;
  }
  return geocode(RequestType.PLACE_ID, placeId, options);
}

/**
 * @deprecated use `geocode` instead
 * Usage: geocode("latlng", "40.714224,-73.961452", *options)
 */
export function fromLatLng(
  lat: number,
  lng: number,
  key?: string,
  language?: string,
  region?: string,
  location_type?: string,
) {
  const options: GeocodeOptions = {
    outputFormat: OutputFormat.JSON,
    enable_address_descriptor: false
  };
  if (key) {
    options.key = key;
  }
  if (language) {
    options.language = language;
  }
  if (region) {
    options.region = region;
  }
  if (location_type) {
    options.location_type = location_type;
  }
  return geocode(RequestType.LATLNG, `${lat},${lng}`, options);
}


interface GeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code: PlusCode;
  types: string[];
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
  location_type: string;
  viewport: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
}

interface AddressDescriptor {
  area: AreaDescriptor[];
  landmarks: Landmark[];
}

interface AreaDescriptor {
  containment: string;
  display_name: {
    language_code: string;
    text: string;
  };
  place_id: string;
}

interface Landmark {
  display_name: {
    language_code: string;
    text: string;
  };
  straight_line_distance_meters: number;
  place_id: string;
  travel_distance_meters: number;
  spatial_relationship: string;
  types: string[];
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}