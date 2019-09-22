# react-geocode

Despite its name, this project

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

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latidude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  response => {
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  error => {
    console.error(error);
  }
);

// Get latidude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);
```

#### Methods

| Method      | Arguments                                                  |   Params   |    Type    | Description                                                                                                                                                      |
| :---------- | :--------------------------------------------------------- | :--------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setApiKey   | `api_key`                                                  |     -      | `function` | set [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) for purposes of quota management. Its optional but recommended |
| setLanguage | `language`                                                 |     -      | `function` | Specify language of the parsed address. [List of the available language codes](https://developers.google.com/maps/faq#languagesupport). Defaults to english      |
| setRegion   | `region`                                                   |     -      | `function` | Specify region of the parsed address.                                                                                                                            |
| enableDebug | `true` or `false`                                          |     -      | `function` | Enable or disable logs. Its optional.                                                                                                                            |
| fromLatLng  | `latitude`, `longitude`, `*apiKey`, `*language`, `*region` | `response` | `function` | Get address from latidude & longitude. \* Optional arguments                                                                                                     |
| fromAddress | `address`, `*apiKey`, `*language`, `*region`               | `response` | `function` | Get latidude & longitude from address. \* Optional arguments                                                                                                     |

### Follow me on Twitter: [@shukerullah](https://twitter.com/shukerullah)

<a href="https://www.buymeacoffee.com/shukerullah" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
