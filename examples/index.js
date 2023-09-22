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
