(function(t,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(t=typeof globalThis<"u"?globalThis:t||self,f(t["react-geocode"]={}))})(this,function(t){"use strict";var f=(e=>(e.ADDRESS="address",e.LATLNG="latlng",e.PLACE_ID="place_id",e))(f||{}),d=(e=>(e.XML="xml",e.JSON="json",e))(d||{});const l="https://maps.googleapis.com/maps/api/geocode";let s={outputFormat:"json"};async function m(e){const{outputFormat:o,...r}=e,i=new URLSearchParams(r).toString(),n=`${l}/${o}?${i}`;try{const u=await(await fetch(n)).json(),{status:g,error_message:D}=u;if(g==="OK")return u;throw new Error(`Geocoding failed: ${D}. Server returned status code ${g}.`)}catch(a){throw a instanceof Error?new Error(`Geocoding request failed: ${a.message}`):new Error(`Geocoding request failed with unknown error: ${a}`)}}function p(e){s={...s,...e}}function y(e){s.key=e}function L(e){s.language=e}function h(e){s.region=e}function w(e){s.components=e}function $(e){s.bounds=e}function E(e){s.result_type=e}function O(e){s.location_type=e}function _(e){s.outputFormat=e}function j(e){s.enable_address_descriptor=e}function c(e,o,r){if(typeof e!="string"||typeof o!="string")throw new Error(`Both requestType and value are required and must be of type string. 
       requestType: ${typeof e}, value: ${typeof o}`);const i={...s,...r,[e]:o};return m(i)}function S(e,o,r,i){const n={outputFormat:"json"};return o&&(n.key=o),r&&(n.language=r),i&&(n.region=i),c("address",e,n)}function b(e,o,r,i){const n={outputFormat:"json"};return o&&(n.key=o),r&&(n.language=r),i&&(n.region=i),c("place_id",e,n)}function A(e,o,r,i,n,a){const u={outputFormat:"json"};return r&&(u.key=r),i&&(u.language=i),n&&(u.region=n),a&&(u.location_type=a),c("latlng",`${e},${o}`,u)}t.OutputFormat=d,t.RequestType=f,t.enableAddressDescriptor=j,t.fromAddress=S,t.fromLatLng=A,t.fromPlaceId=b,t.geocode=c,t.setBounds=$,t.setComponents=w,t.setDefaults=p,t.setKey=y,t.setLanguage=L,t.setLocationType=O,t.setOutputFormat=_,t.setRegion=h,t.setResultType=E,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=index.umd.js.map
