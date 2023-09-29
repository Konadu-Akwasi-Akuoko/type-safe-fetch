"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => tsFetch
});
module.exports = __toCommonJS(src_exports);
function tsFetch({
  url,
  options,
  responseSchema
}) {
  return {
    /**
     * Sends a `GET` request to a specified URL with the provided options.
     * Returns the response data, plus a json method parsed according to the provided response schema.
     * @returns An object with methods to access the response data, such as `arrayBuffer`, `blob`, `body`, `clone`, `formData`, `headers`, `ok`, `redirected`, `status`, `statusText`, `text`, `type`, `url`, and `json`. The `json` method returns the parsed JSON data.
     */
    query: () => __async(this, null, function* () {
      const request = yield fetch(url, options);
      const {
        body,
        bodyUsed,
        headers,
        ok,
        redirected,
        status,
        statusText,
        type,
        url: responseUrl
      } = request;
      return {
        arrayBuffer: () => request.arrayBuffer(),
        blob: () => request.blob(),
        body,
        bodyUsed,
        clone: () => request.clone(),
        formData: () => request.formData(),
        headers,
        ok,
        redirected,
        status,
        statusText,
        text: () => request.text(),
        type,
        url: responseUrl,
        json: () => __async(this, null, function* () {
          const data = yield request.json();
          return data;
        })
      };
    }),
    /**
     * Sets the Zod schema for the request body and returns an object with a `mutation` method.
     * @param bodySchema - A Zod schema that defines the shape of the request body.
     * @returns An object with a `mutation` method for sending a `POST` | `PUT` | `PATCH` | `DELETE`
     * request with a request body that is parsed according to the provided body schema.
     */
    bodySchema: function(bodySchema) {
      return {
        /**
         * Sends a `POST`, `PUT`, `PATCH`, or `DELETE` request to a specified URL with the provided options and a request body.
         * Returns the response data with a json method parsed according to the provided response schema.
         * @param bodyObject - The request body object that will be sent with the HTTP request. It should match the shape defined by the `bodySchema` provided when calling the `bodySchema` method of `tsFetch`.
         * @returns An object with methods to access the response data, such as `arrayBuffer`, `blob`, `body`, `clone`, `formData`, `headers`, `ok`, `redirected`, `status`, `statusText`, `text`, `type`, `url`, and `json`. The `json` method returns the parsed JSON data.
         */
        mutation: (bodyObject) => __async(this, null, function* () {
          const request = yield fetch(url, __spreadProps(__spreadValues({}, options), {
            body: JSON.stringify(bodyObject)
          }));
          const {
            body,
            bodyUsed,
            headers,
            ok,
            redirected,
            status,
            statusText,
            type,
            url: responseUrl
          } = request;
          return {
            arrayBuffer: () => request.arrayBuffer(),
            blob: () => request.blob(),
            body,
            bodyUsed,
            clone: () => request.clone(),
            formData: () => request.formData(),
            headers,
            ok,
            redirected,
            status,
            statusText,
            text: () => request.text(),
            type,
            url: responseUrl,
            json: () => __async(this, null, function* () {
              const data = yield request.json();
              return data;
            })
          };
        })
      };
    },
    /**
     * Sends a `POST` | `PUT` | `PATCH` | `DELETE` request to the specified URL with the provided options without a request body.
     * @returns The response data, parsed according to the provided response schema.
     */
    mutation: () => __async(this, null, function* () {
      const request = yield fetch(url, options);
      const {
        body,
        bodyUsed,
        headers,
        ok,
        redirected,
        status,
        statusText,
        type,
        url: responseUrl
      } = request;
      return {
        arrayBuffer: () => request.arrayBuffer(),
        blob: () => request.blob(),
        body,
        bodyUsed,
        clone: () => request.clone(),
        formData: () => request.formData(),
        headers,
        ok,
        redirected,
        status,
        statusText,
        text: () => request.text(),
        type,
        url: responseUrl,
        json: () => __async(this, null, function* () {
          const data = yield request.json();
          return data;
        })
      };
    }),
    /**
     * Returns the response schema defined in the `tsFetch` function.
     *
     * @returns The response schema defined in the `tsFetch` function.
     */
    responseType: () => responseSchema
  };
}
//# sourceMappingURL=index.js.map