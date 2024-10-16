var d = /* @__PURE__ */ ((t) => (t.ADDRESS = "address", t.LATLNG = "latlng", t.PLACE_ID = "place_id", t))(d || {}), p = /* @__PURE__ */ ((t) => (t.XML = "xml", t.JSON = "json", t))(p || {});
const g = "https://maps.googleapis.com/maps/api/geocode";
let s = {
  outputFormat: "json"
  /* JSON */
};
async function l(t) {
  const { outputFormat: n, ...e } = t, r = new URLSearchParams(
    e
  ).toString(), o = `${g}/${n}?${r}`;
  try {
    const i = await (await fetch(o)).json(), { status: c, error_message: f } = i;
    if (c === "OK")
      return i;
    throw new Error(
      `Geocoding failed: ${f}. Server returned status code ${c}.`
    );
  } catch (a) {
    throw a instanceof Error ? new Error(`Geocoding request failed: ${a.message}`) : new Error(`Geocoding request failed with unknown error: ${a}`);
  }
}
function m(t) {
  s = {
    ...s,
    ...t
  };
}
function w(t) {
  s.key = t;
}
function y(t) {
  s.language = t;
}
function $(t) {
  s.region = t;
}
function h(t) {
  s.components = t;
}
function E(t) {
  s.bounds = t;
}
function L(t) {
  s.result_type = t;
}
function _(t) {
  s.location_type = t;
}
function j(t) {
  s.outputFormat = t;
}
function G(t) {
  s.enable_address_descriptor = t;
}
function u(t, n, e) {
  if (typeof t != "string" || typeof n != "string")
    throw new Error(
      `Both requestType and value are required and must be of type string. 
       requestType: ${typeof t}, value: ${typeof n}`
    );
  const r = {
    ...s,
    ...e,
    [t]: n
  };
  return l(r);
}
function O(t, n, e, r) {
  const o = {
    outputFormat: "json"
    /* JSON */
  };
  return n && (o.key = n), e && (o.language = e), r && (o.region = r), u("address", t, o);
}
function S(t, n, e, r) {
  const o = {
    outputFormat: "json"
    /* JSON */
  };
  return n && (o.key = n), e && (o.language = e), r && (o.region = r), u("place_id", t, o);
}
function A(t, n, e, r, o, a) {
  const i = {
    outputFormat: "json"
    /* JSON */
  };
  return e && (i.key = e), r && (i.language = r), o && (i.region = o), a && (i.location_type = a), u("latlng", `${t},${n}`, i);
}
export {
  p as OutputFormat,
  d as RequestType,
  G as enableAddressDescriptor,
  O as fromAddress,
  A as fromLatLng,
  S as fromPlaceId,
  u as geocode,
  E as setBounds,
  h as setComponents,
  m as setDefaults,
  w as setKey,
  y as setLanguage,
  _ as setLocationType,
  j as setOutputFormat,
  $ as setRegion,
  L as setResultType
};
//# sourceMappingURL=index.es.js.map
