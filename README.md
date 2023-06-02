![react-geocode](https://socialify.git.ci/shukerullah/react-geocode/image?font=Inter&forks=1&issues=1&language=1&pulls=1&stargazers=1&theme=Light)

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
  geocode,
  reverseGeocode,
  setKey,
  setLanguage,
  setRegion,
  setLocationType,
} from "react-geocode";

// Set Google Maps Geocoding API key for purposes of quota management. It's optional but recommended.
setKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

// Set default response language. Optional.
setLanguage("en");

// Set default response region. Optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
setRegion("es");

// Get latitude & longitude from address.
geocode("Eiffel Tower").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);

// Set default location_type filter. Optional.
// Google Geocoder returns more than one address for a given lat/lng.
// In some cases, we need one address as a response for which Google itself provides a location_type filter.
// So we can easily parse the result for fetching address components.
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below Google docs in the description, ROOFTOP param returns the most accurate result.
setLocationType("ROOFTOP");

// Get address from latitude & longitude.
reverseGeocode("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  (error) => {
    console.error(error);
  }
);

// Get formatted address, city, state, country from latitude & longitude when
// Geocode.setLocationType("ROOFTOP") is enabled.
// The below parser will work for most countries.
reverseGeocode("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    let city, state, country;
    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (
        let j = 0;
        j < response.results[0].address_components[i].types.length;
        j++
      ) {
        switch (response.results[0].address_components[i].types[j]) {
          case "locality":
            city = response.results[0].address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            state = response.results[0].address_components[i].long_name;
            break;
          case "country":
            country = response.results[0].address_components[i].long_name;
            break;
        }
      }
    }
    console.log(city, state, country);
  },
  (error) => {
    console.error(error);
  }
);
```

### API

#### Methods

| Method          | Params                              |   Return   |    Type    | Description                                                                                                                                                                                                                    |
| :-------------- | :---------------------------------- | :--------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setKey          | `key`                               |     -      | `function` | Your application's API key. This key identifies your application for purposes of quota management. Learn how to [get a key](https://developers.google.com/maps/documentation/geocoding/get-api-key).                           |
| setLanguage     | `language`                          |     -      | `function` | Specify language of the parsed address. [List of the available language codes](https://developers.google.com/maps/faq#languagesupport).                                                                                        |
| setComponents   | `components`                        |     -      | `function` | A components filter with elements separated by a pipe (\|). See more information about [component filtering](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#component-filtering).               |
| setRegion       | `region`                            |     -      | `function` | Specify region of the parsed address. For more information see [Region Biasing](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#RegionCodes).                                                    |
| setBounds       | `bounds`                            |     -      | `function` | The bounding box of the viewport within which to bias geocode results more prominently. For more information see) [Viewport Biasing](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#Viewports). |
| setLocationType | `location_type`                     |     -      | `function` | A filter of one or more location types, separated by a pipe (\|). The following values are supported: `ROOFTOP` `RANGE_INTERPOLATED` `GEOMETRIC_CENTER` and `APPROXIMATE`                                                      |
| setResultType   | `result_type`                       |     -      | `function` | A filter of one or more address types, separated by a pipe (\|)                                                                                                                                                                |
| geocode         | `address`, `*options`               | `response` | `function` | Get latitude & longitude from address. \* Optional params                                                                                                                                                                      |
| reverseGeocode  | `latitude`, `longitude`, `*options` | `response` | `function` | Get address from latitude & longitude. \* Optional params                                                                                                                                                                      |

#### Geocode(address, \*options)

Sends a geocoding request to the Google Geocoding API for a given address. To geocode an address, use the `geocode` function:

```js
import { geocode } from "react-geocode";
const address = "1600 Amphitheatre Parkway, Mountain View, CA";
geocode(address)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

##### Parameters

- **address** (string): The address to geocode.
- **options (optional object)**: Additional options for the geocoding request.
  - **key (string)**: API key for Google Geocoding API.
  - **language (string)**: Language code for the response.
  - **region (string)**: Region code for the response.
  - **components (string)**: Component filtering for the response.
  - **bounds (string)**: Bounding box for the response.
  - **result_type (string)**: Result type filtering for the response.
  - **location_type (string)**: Location type filtering for the response.

You can also pass additional options to the `geocode` function:

```js
geocode(address, {
  key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  language: "en",
  region: "us",
  result_type: "street_address",
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

#### reverseGeocode(latitude, longitude, \*options)

Sends a reverse geocoding request to the Google Geocoding API for a given latitude and longitude. To get an address from latitude and longitude, use the `reverseGeocode` function:

```js
import { reverseGeocode } from "react-geocode";
const latitude = "48.8583701";
const longitude = "2.2922926";
reverseGeocode(latitude, longitude)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

##### Parameters

- **latitude** (string): The latitude of the location.
- **longitude** (string): The longitude of the location.
- **options (optional object)**: Additional options for the reverse geocoding request.
  - **key (string)**: API key for Google Geocoding API.
  - **language (string)**: Language code for the response.
  - **region (string)**: Region code for the response.
  - **result_type (string)**: Result type filtering for the response.
  - **location_type (string)**: Location type filtering for the response.

You can also pass additional options to the `reverseGeocode` function:

```js
reverseGeocode(latitude, longitude, {
  key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  language: "en",
  region: "us",
  result_type: "street_address",
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

##### Returns

The `reverseGeocode` function returns a Promise that resolves with the reverse geocoding response object or rejects with an error if the request fails.

The Promise resolves with a `GeocodeResponse` object, which has the same properties as the geocode response object mentioned above.

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

### Note:

> Make sure to replace "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" with your actual API key from the Google Cloud Console. Also, feel free to modify the examples and add any necessary configurations based on your specific requirements.

Let me know if you need any further assistance!

### Follow me on Twitter: [@shukerullah](https://twitter.com/shukerullah)

<a href="https://www.buymeacoffee.com/shukerullah" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
