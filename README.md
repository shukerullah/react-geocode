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
npm install --save react-geocode
```

or

```shell
yarn add react-geocode
```

### Example

```js
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latitude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  (error) => {
    console.error(error);
  }
);

// Get formatted address, city, state, country from latitude & longitude when
// Geocode.setLocationType("ROOFTOP") enabled
// the below parser will work for most of the countries
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    let city, state, country;
    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
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
    console.log(address);
  },
  (error) => {
    console.error(error);
  }
);

// Get latitude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);
```

#### Methods

| Method          | Arguments                                                  |   Params   |    Type    | Description                                                                                                                                                                                                                              |
| :-------------- | :--------------------------------------------------------- | :--------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setApiKey       | `api_key`                                                  |     -      | `function` | set [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) for purposes of quota management. Its optional but recommended                                                                         |
| setLanguage     | `language`                                                 |     -      | `function` | Specify language of the parsed address. [List of the available language codes](https://developers.google.com/maps/faq#languagesupport). Defaults to english                                                                              |
| setRegion       | `region`                                                   |     -      | `function` | Specify region of the parsed address.                                                                                                                                                                                                    |
| setLocationType | `location_type`                                            |     -      | `function` | Specify geometry of the parsed address. [List of available params](<https://developers.google.com/maps/documentation/geocoding/overview#:~:text=%22ROOFTOP%22%20indicates%20that%20the%20returned,points%20(such%20as%20intersections)>) |
| enableDebug     | `true` or `false`                                          |     -      | `function` | Enable or disable logs. Its optional.                                                                                                                                                                                                    |
| fromLatLng      | `latitude`, `longitude`, `*apiKey`, `*language`, `*region` | `response` | `function` | Get address from latitude & longitude. \* Optional arguments                                                                                                                                                                             |
| fromAddress     | `address`, `*apiKey`, `*language`, `*region`               | `response` | `function` | Get latitude & longitude from address. \* Optional arguments                                                                                                                                                                             |

### Follow me on Twitter: [@shukerullah](https://twitter.com/shukerullah)

<a href="https://www.buymeacoffee.com/shukerullah" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
