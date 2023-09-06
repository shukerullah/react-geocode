/**
 * Geocode Module
 *
 * A module to transform a description of a location (i.e. street address, town name, etc.)
 * into geographic coordinates (i.e. latitude and longitude) and vice versa.
 *
 * This module uses Google Maps Geocoding API and requires an API key for purposes of quota management.
 *
 * @package react-geocode
 * @author  Pir Shukarulalh Shah <shuker_rashdi@yahoo.com>  (http://www.shukarullah.com)
 * @collaborator  Ziyaddin Sadigov <ziyaddinsadigov@gmail.com>
 */

let DEBUG = false;
let API_KEY = null;
let LANGUAGE = "en";
let REGION = null;
let LOCATION_TYPE = null;
const GOOGLE_API = "https://maps.googleapis.com/maps/api/geocode/json";

function log(message, warn = false) {
  if (DEBUG) {
    if (warn) {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
}

async function handleUrl(url) {
  const response = await fetch(url).catch(() =>
    Promise.reject(new Error("Error fetching data"))
  );

  const json = await response.json().catch(() => {
    log("Error parsing server response");
    return Promise.reject(new Error("Error parsing server response"));
  });

  if (json.status === "OK") {
    log(json);
    return json;
  }
  log(
    `${json.error_message}.\nServer returned status code ${json.status}`,
    true
  );
  return Promise.reject(
    new Error(
      `${json.error_message}.\nServer returned status code ${json.status}`
    )
  );
}

export default {
  /**
   *
   *
   * @param {string} apiKey
   */
  setApiKey(apiKey) {
    API_KEY = apiKey;
  },

  /**
   *
   *
   * @param {string} language
   */
  setLanguage(language) {
    LANGUAGE = language;
  },

  /**
   *
   *
   * @param {string} region
   */
  setRegion(region) {
    REGION = region;
  },

  /**
   *
   *
   * @param {boolean} [flag=true]
   */
  enableDebug(flag = true) {
    DEBUG = flag;
  },

  /**
   *
   *
   * @param {string} locationType
   * Accepted values: ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE
   */
  setLocationType(locationType) {
    LOCATION_TYPE = locationType;
  },

  /**
   *
   *
   * @param {string} lat
   * @param {string} lng
   * @param {string} [apiKey]
   * @param {string} [language]
   * @param {string} [region]
   * @param {string} [locationType]
   * @returns {Promise}
   */
  async fromLatLng(lat, lng, apiKey, language, region, locationType) {
    if (!lat || !lng) {
      log("Provided coordinates are invalid", true);
      return Promise.reject(new Error("Provided coordinates are invalid"));
    }

    const latLng = `${lat},${lng}`;
    let url = `${GOOGLE_API}?latlng=${encodeURIComponent(latLng)}`;

    if (apiKey || API_KEY) {
      API_KEY = apiKey || API_KEY;
      url += `&key=${API_KEY}`;
    }

    if (language || LANGUAGE) {
      LANGUAGE = language || LANGUAGE;
      url += `&language=${LANGUAGE}`;
    }

    if (region || REGION) {
      REGION = region || REGION;
      url += `&region=${encodeURIComponent(REGION)}`;
    }

    if (locationType || LOCATION_TYPE) {
      LOCATION_TYPE = locationType || REGION;
      url += `&location_type=${encodeURIComponent(LOCATION_TYPE)}`;
    }

    return handleUrl(url);
  },

  /**
   *
   *
   * @param {string} address
   * @param {string} [apiKey]
   * @param {string} [language]
   * @param {string} [region]
   * @returns {Promise}
   */
  async fromAddress(address, apiKey, language, region) {
    if (!address) {
      log("Provided address is invalid", true);
      return Promise.reject(new Error("Provided address is invalid"));
    }

    let url = `${GOOGLE_API}?address=${encodeURIComponent(address)}`;

    if (apiKey || API_KEY) {
      API_KEY = apiKey || API_KEY;
      url += `&key=${API_KEY}`;
    }

    if (language || LANGUAGE) {
      LANGUAGE = language || LANGUAGE;
      url += `&language=${LANGUAGE}`;
    }

    if (region || REGION) {
      REGION = region || REGION;
      url += `&region=${encodeURIComponent(REGION)}`;
    }

    return handleUrl(url);
  },

  /**
   * @see https://developers.google.com/maps/documentation/places/web-service/place-id
   *
   * @param {string} placeId
   * @param {string} [apiKey]
   * @param {string} [language]
   * @param {string} [region]
   * @returns {Promise}
   */
  async fromPlaceId(placeId, apiKey, language, region) {
    if (!placeId) {
      log("Provided place_id is invalid", true);
      return Promise.reject(new Error("Provided place_id is invalid"));
    }

    let url = `${GOOGLE_API}?place_id=${encodeURIComponent(placeId)}`;

    if (apiKey || API_KEY) {
      API_KEY = apiKey || API_KEY;
      url += `&key=${API_KEY}`;
    }

    if (language || LANGUAGE) {
      LANGUAGE = language || LANGUAGE;
      url += `&language=${LANGUAGE}`;
    }

    if (region || REGION) {
      REGION = region || REGION;
      url += `&region=${encodeURIComponent(REGION)}`;
    }

    return handleUrl(url);
  },
};
