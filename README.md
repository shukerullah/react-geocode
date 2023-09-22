![react-geocode](https://socialify.git.ci/shukerullah/react-geocode/image?font=Inter&forks=1&issues=1&language=1&pulls=1&stargazers=1&theme=Auto)

**Despite its name, this project**

```
 _    ,          _ __                                                           _ __
' )  /          ' )  )   _/_ /                _/_        /             _/_ /   ' )  )           _/_
 /--/ __.  _     /  / __ /  /_  o ____  _,    /  __   __/ __   , , , o /  /_    /--' _  __.  _. /
/  (_(_/|_/_)_  /  (_(_)<__/ /_<_/ / <_(_)_  <__(_)  (_/_(_)  (_(_/_<_<__/ /_  /  \_</_(_/|_(__<__
                                        /|
                                       |/
```

A module to transform a description of a location (i.e. street address, town name, etc.) into geographic coordinates (i.e. latitude and longitude) and vice versa.

This module uses [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) and requires an API key for purposes of quota management. Please check [this link](https://developers.google.com/maps/documentation/geocoding/get-api-key) out to obtain your API key.

### Install

```shell
yarn add react-geocode
```

or

```shell
npm install --save react-geocode
```

### Example

```js
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

// Set default response language and region (optional).
// This sets default values for language and region for geocoding requests.
setDefaults({
  key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Your API key here.
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
});

// Alternatively

// Set Google Maps Geocoding API key for quota management (optional but recommended).
// Use this if you want to set the API key independently.
setKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"); // Your API key here.

// Set default response language (optional).
// This sets the default language for geocoding responses.
setLanguage("en"); // Default language for responses.

// Set default response region (optional).
// This sets the default region for geocoding responses.
setRegion("es"); // Default region for responses.

// Get latitude & longitude from address.
fromAddress("Eiffel Tower")
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
  })
  .catch(console.error);

// Get address from latitude & longitude.
fromLatLng(48.8583701, 2.2922926)
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
  })
  .catch(console.error);

// Get latitude & longitude from place_id.
fromPlaceId("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
  })
  .catch(console.error);

// Alternatively, use geocode function for consistency
geocode(RequestType.ADDRESS, "Eiffel Tower")
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
  })
  .catch(console.error);

// Set default location_type filter (optional).
// This sets the default location type filter to "ROOFTOP" for geocoding responses.
setLocationType("ROOFTOP");

// Get address from latitude & longitude.
geocode(RequestType.LATLNG, "48.8583701,2.2922926")
  .then(({ results }) => {
    const address = results[0].formatted_address;
    console.log(address);
  })
  .catch(console.error);

// Get formatted address, city, state, country from latitude & longitude.
geocode(RequestType.LATLNG, "48.8583701,2.2922926", {
  location_type: "ROOFTOP", // Override location type filter for this request.
  enable_address_descriptor: true, // Include address descriptor in response.
})
  .then(({ results }) => {
    const address = results[0].formatted_address;
    const { city, state, country } = results[0].address_components.reduce(
      (acc, component) => {
        if (component.types.includes("locality"))
          acc.city = component.long_name;
        else if (component.types.includes("administrative_area_level_1"))
          acc.state = component.long_name;
        else if (component.types.includes("country"))
          acc.country = component.long_name;
        return acc;
      },
      {}
    );
    console.log(city, state, country);
    console.log(address);
  })
  .catch(console.error);

// Override default options for geocode requests.
// These examples demonstrate how to override default settings for specific requests.
const addressResponse = await geocode(RequestType.ADDRESS, "Eiffel Tower", {
  language: "en",
  region: "sp",
});

const placeIdResponse = await geocode(
  RequestType.PLACE_ID,
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  { language: "en", region: "sp" }
);

const latlngResponse = await geocode(
  RequestType.LATLNG,
  "48.8583701,2.2922926",
  { language: "en", region: "sp", enable_address_descriptor: true }
);
```

### API

#### Methods

| Method                  | Params                                                                               | Return     | Type       | Description                                                                                                                                                                                                                    |
| :---------------------- | :----------------------------------------------------------------------------------- | :--------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setKey                  | `key`                                                                                | -          | function   | Your application's API key. This key identifies your application for purposes of quota management. [Learn how to get a key](https://developers.google.com/maps/documentation/geocoding/get-api-key).                           |
| setLanguage             | `language`                                                                           | -          | function   | Specify the language of the parsed address. [List of available language codes](https://developers.google.com/maps/faq#languagesupport).                                                                                        |
| setComponents           | `components`                                                                         | -          | function   | A components filter with elements separated by a pipe ( \| ). See more information about [component filtering](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#component-filtering).             |
| setRegion               | `region`                                                                             | -          | function   | Specify the region of the parsed address. For more information, see [Region Biasing](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#RegionCodes).                                               |
| setBounds               | `bounds`                                                                             | -          | function   | The bounding box of the viewport within which to bias geocode results more prominently. For more information, see [Viewport Biasing](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#Viewports). |
| setLocationType         | `location_type`                                                                      | -          | function   | A filter of one or more location types, separated by a pipe ( \| ). The following values are supported: `ROOFTOP`, `RANGE_INTERPOLATED`, `GEOMETRIC_CENTER`, and `APPROXIMATE`.                                                |
| setResultType           | `result_type`                                                                        | -          | function   | A filter of one or more address types, separated by a pipe ( \| ).                                                                                                                                                             |
| setOutputFormat         | `outputFormat` (OutputFormat)                                                        | -          | function   | Sets the desired output format for geocoding requests. The format can be either `XML` or `JSON`.                                                                                                                               |
| enableAddressDescriptor | `enableAddressDescriptor` (boolean)                                                  | -          | function   | Sets whether to include an address descriptor in the reverse geocoding response.                                                                                                                                               |
| geocode                 | `requestType` (RequestType \| string), `value` (string), `options?` (GeocodeOptions) | response   | function   | Get latitude & longitude from an address. Optional params.                                                                                                                                                                     |
| fromLatLng              | `latitude`, `longitude`, `*apiKey`, `*language`, `*region`                           | `response` | `function` | Get address from latitude & longitude. Optional params.                                                                                                                                                                        |
| fromAddress             | `address`, `*apiKey`, `*language`, `*region`                                         | `response` | `function` | Get latitude & longitude from address. Optional params.                                                                                                                                                                        |
| fromPlaceId             | `placeId`, `*apiKey`, `*language`, `*region`                                         | `response` | `function` | Get latitude & longitude from place id. Optional params.                                                                                                                                                                       |

#### Geocode(requestType, value, \*options)

Sends a geocoding request to the Google Geocoding API for a given address. To geocode an address, use the geocode function:

```js
import { geocode, RequestType } from "react-geocode";
const address = "1600 Amphitheatre Parkway, Mountain View, CA";
geocode(RequestType.ADDRESS, address)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

##### Parameters

- **requestType** (`RequestType` | `string`): Identifier to specify the type of request (`place_id`, `address`, `latlng`, `components` etc).
- **value** (`string`): The value to geocode. This can be an address, latitude and longitude (`lat,lng`), or a place ID.
- **options (optional `object`)**: Additional options for the geocoding request.
  - **key (`string`)**: API key for Google Geocoding API.
  - **language (`string`)**: Language code for the response.
  - **region (`string`)**: Region code for the response.
  - **components (`string`)**: Component filtering for the response.
  - **bounds (`string`)**: Bounding box for the response.
  - **result_type (`string`)**: Result type filtering for the response.
  - **location_type (`string`)**: Location type filtering for the response.

You can also pass additional options to the `geocode` function:

```js
geocode("latlng", "48.8583701,2.2922926", {
  key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  language: "en",
  region: "us",
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

##### Returns

The `geocode` function returns a Promise that resolves with the geocoding response object, or rejects with an error if the request fails.

A Promise that resolves with a `GeocodeResponse` object, which has the following properties:

- **status** (string): The status of the geocoding request. Possible values are "OK", "ZERO_RESULTS", "OVER_QUERY_LIMIT", "REQUEST_DENIED", "INVALID_REQUEST", and "UNKNOWN_ERROR".
- **results** (array): An array of geocoding results. Each result is an object with the following properties:
  - **formatted_address** (string): The human-readable address of the location.
  - **geometry** (object): The geometry of the location, including its latitude, longitude, and location type.
  - **address_components** (array): An array of address components for the location, including its street number, street name, city, state, postal code, and country.

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

### Note:

> Make sure to replace "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" with your actual API key from the Google Cloud Console. Also, feel free to modify the examples and add any necessary configurations based on your specific requirements.

Let me know if you need any further assistance!

### Follow me on Twitter: [@shukerullah](https://twitter.com/shukerullah)

<a href="https://www.buymeacoffee.com/shukerullah" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
