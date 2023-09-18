import {
  setKey,
  geocode,
  setLanguage,
  setRegion,
  setLocationType,
  RequestType
} from "react-geocode";

// Set Google Maps Geocoding API key for quota management (optional but recommended).
setKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

// Set default response language (optional).
setLanguage("en");

// Set default response region (optional).
setRegion("es");

// Get latitude & longitude from address.
geocode(RequestType.ADDRESS, "Eiffel Tower").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);

// Get latitude & longitude from place_id.
geocode(RequestType.PLACE_ID, "ChIJd8BlQ2BZwokRAFUEcm_qrcA").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);

// Set default location_type filter (optional).
// Google geocoder returns multiple addresses for a given lat/lng.
// Location_type filter helps fetch a single address.
// Accepted values: ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE.
// ROOFTOP provides the most accurate result.
setLocationType("ROOFTOP");

// Get address from latitude & longitude.
geocode(RequestType.LATLNG, "48.8583701,2.2922926").then(
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
geocode("latlng", "48.8583701,2.2922926").then(
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

// You can also pass optional params for geocode and reverseGeocode that will override
// default options that you have set.
const addressResponse = await geocode("address", "Eiffel Tower", {
  language: "en",
  region: "sp",
});

const placeIdResponse = await geocode("place_id", "Eiffel Tower", {
  language: "en",
  region: "sp",
});

const latlngResponse = await geocode("latlng", "48.8583701,2.2922926", {
  language: "en",
  region: "sp",
  enable_address_descriptor: true
});