/**
 * The URL of the Google Geocoding API.
 */
const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json";

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
}

interface GeocodeResponse {
  status: string;
  results: {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  error_message?: string;
}

/**
 * The query parameters for geocoding requests.
 */
type GeocodeQueryParams = GeocodeOptions & {
  address?: string; // The address to geocode
  latlng?: string; // The latitude/longitude of the location to geocode
};

/**
 * Default options for the geocoding requests.
 */
const defaultOptions: GeocodeOptions = {};

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
    queryParams as Record<string, string>
  ).toString();
  const url = `${GOOGLE_GEOCODE_API}?${queryString}`;
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
 * Sends a geocoding request to the Google Maps Geocoding API for a given address and returns the response.
 * @function geocode
 * @async
 * @param {string} address - The address to geocode.
 * @param {Options} [options={}] - Additional options for the geocoding request.
 * @returns {Promise<GeocodeResponse>} - A promise that resolves with the geocoding response object.
 * @throws {Error} - Throws an error if the address is invalid or the geocoding request fails.
 */
export function geocode(
  address: string,
  options?: GeocodeOptions
): Promise<any> {
  if (!address) {
    throw new Error("Please provide a valid address to proceed.");
  }
  const queryParams: GeocodeQueryParams = {
    ...defaultOptions,
    ...options,
    address,
  };
  return geocodeRequest(queryParams);
}

/**
 * Sends a reverse geocoding request to the Google Maps Geocoding API for a given latitude and longitude and returns the response.
 * @function reverseGeocode
 * @async
 * @param {number} lat - The latitude to reverse geocode.
 * @param {number} lng - The longitude to reverse geocode.
 * @param {Options} [options={}] - Additional options for the reverse geocoding request such as language, result_type, and locationType.
 * @returns {Promise} - A promise that resolves with the reverse geocoding response object.
 * @throws {Error} - Throws an error if the latitude or longitude are invalid or the geocoding request fails.
 */
export function reverseGeocode(
  lat: number,
  lng: number,
  options?: GeocodeOptions
): Promise<any> {
  if (isNaN(lat) || isNaN(lng)) {
    throw new Error("Latitude and longitude are required and must be numbers.");
  }
  const queryParams: GeocodeQueryParams = {
    ...defaultOptions,
    ...options,
    latlng: `${lat},${lng}`,
  };
  return geocodeRequest(queryParams);
}

export function fromLatLng(
  lat: number,
  lng: number,
  key?: string,
  language?: string,
  region?: string,
  location_type?: string
) {
  console.warn("fromLatLng is deprecated, use reverseGeocode instead.");
  const options: GeocodeOptions = {};
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
  return reverseGeocode(lat, lng, options);
}

export function fromAddress(
  address: string,
  key?: string,
  language?: string,
  region?: string
) {
  console.warn("fromAddress is deprecated, use geocode instead.");
  const options: GeocodeOptions = {};
  if (key) {
    options.key = key;
  }
  if (language) {
    options.language = language;
  }
  if (region) {
    options.region = region;
  }
  return geocode(address, { key, language, region });
}
