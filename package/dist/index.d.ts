import { ZodTypeAny, z } from "zod";

/**
 * Makes an HTTP request and handles the response.
 * @param url - The URL of the API endpoint to send the request to.
 * @param options - An object containing the options for the request if any, excluding the `body` option.
 * @param responseSchema - A Zod schema that defines the expected shape of the response data.
 * @returns An object with three methods: `query`, `bodySchema`, and `mutation`.
 */
declare function tsFetch<T extends ZodTypeAny>({ url, options, responseSchema, }: {
    url: string;
    options: Omit<RequestInit, "body">;
    responseSchema: T;
}): {
    /**
     * Sends a `GET` request to a specified URL with the provided options.
     * Returns the response data, plus a json method parsed according to the provided response schema.
     * @returns An object with methods to access the response data, such as `arrayBuffer`, `blob`, `body`, `clone`, `formData`, `headers`, `ok`, `redirected`, `status`, `statusText`, `text`, `type`, `url`, and `json`. The `json` method returns the parsed JSON data.
     */
    query: () => Promise<{
        /**
         * Sends an HTTP request and returns the response as an ArrayBuffer.
         */
        arrayBuffer: () => Promise<ArrayBuffer>;
        /**
         * Sends an HTTP request and returns the response as a Blob.
         */
        blob: () => Promise<Blob>;
        /**
         * The body of the response.
         */
        body: ReadableStream<Uint8Array> | null;
        /**
         * A boolean indicating whether the response body has been used.
         */
        bodyUsed: boolean;
        /**
         * Creates a clone of the response.
         */
        clone: () => Response;
        /**
         * Sends an HTTP request and returns the response as FormData.
         */
        formData: () => Promise<FormData>;
        /**
         * The headers of the response.
         */
        headers: Headers;
        /**
         * A boolean indicating whether the request was successful.
         */
        ok: boolean;
        /**
         * A boolean indicating whether the request was redirected.
         */
        redirected: boolean;
        /**
         * The status code of the response.
         */
        status: number;
        /**
         * The status message of the response.
         */
        statusText: string;
        /**
         * Sends an HTTP request and returns the response as text.
         */
        text: () => Promise<string>;
        /**
         * The type of the response.
         */
        type: ResponseType;
        /**
         * The URL of the response.
         */
        url: string;
        /**
         * Sends an HTTP request and returns the response object.
         * @returns The parsed JSON response.
         * @throws {Error} If the response body is not valid JSON or does not match the provided schema.
         */
        json: () => Promise<z.infer<typeof responseSchema>>;
    }>;
    /**
     * Sets the Zod schema for the request body and returns an object with a `mutation` method.
     * @param bodySchema - A Zod schema that defines the shape of the request body.
     * @returns An object with a `mutation` method for sending a `POST` | `PUT` | `PATCH` | `DELETE`
     * request with a request body that is parsed according to the provided body schema.
     */
    bodySchema: <U extends ZodTypeAny>(bodySchema: U) => {
        /**
         * Sends a `POST`, `PUT`, `PATCH`, or `DELETE` request to a specified URL with the provided options and a request body.
         * Returns the response data with a json method parsed according to the provided response schema.
         * @param bodyObject - The request body object that will be sent with the HTTP request. It should match the shape defined by the `bodySchema` provided when calling the `bodySchema` method of `tsFetch`.
         * @returns An object with methods to access the response data, such as `arrayBuffer`, `blob`, `body`, `clone`, `formData`, `headers`, `ok`, `redirected`, `status`, `statusText`, `text`, `type`, `url`, and `json`. The `json` method returns the parsed JSON data.
         */
        mutation: (bodyObject: z.TypeOf<U>) => Promise<{
            /**
             * Sends an HTTP request and returns the response as an ArrayBuffer.
             */
            arrayBuffer: () => Promise<ArrayBuffer>;
            /**
             * Sends an HTTP request and returns the response as a Blob.
             */
            blob: () => Promise<Blob>;
            /**
             * The body of the response.
             */
            body: ReadableStream<Uint8Array> | null;
            /**
             * A boolean indicating whether the response body has been used.
             */
            bodyUsed: boolean;
            /**
             * Creates a clone of the response.
             */
            clone: () => Response;
            /**
             * Sends an HTTP request and returns the response as FormData.
             */
            formData: () => Promise<FormData>;
            /**
             * The headers of the response.
             */
            headers: Headers;
            /**
             * A boolean indicating whether the request was successful.
             */
            ok: boolean;
            /**
             * A boolean indicating whether the request was redirected.
             */
            redirected: boolean;
            /**
             * The status code of the response.
             */
            status: number;
            /**
             * The status message of the response.
             */
            statusText: string;
            /**
             * Sends an HTTP request and returns the response as text.
             */
            text: () => Promise<string>;
            /**
             * The type of the response.
             */
            type: ResponseType;
            /**
             * The URL of the response.
             */
            url: string;
            /**
             * Sends an HTTP request and returns the response object.
             * @returns The parsed JSON response.
             * @throws {Error} If the response body is not valid JSON or does not match the provided schema.
             */
            json: () => Promise<z.infer<typeof responseSchema>>;
        }>;
    };
    /**
     * Sends a `POST` | `PUT` | `PATCH` | `DELETE` request to the specified URL with the provided options without a request body.
     * @returns The response data, parsed according to the provided response schema.
     */
    mutation: () => Promise<{
        /**
         * Sends an HTTP request and returns the response as an ArrayBuffer.
         */
        arrayBuffer: () => Promise<ArrayBuffer>;
        /**
         * Sends an HTTP request and returns the response as a Blob.
         */
        blob: () => Promise<Blob>;
        /**
         * The body of the response.
         */
        body: ReadableStream<Uint8Array> | null;
        /**
         * A boolean indicating whether the response body has been used.
         */
        bodyUsed: boolean;
        /**
         * Creates a clone of the response.
         */
        clone: () => Response;
        /**
         * Sends an HTTP request and returns the response as FormData.
         */
        formData: () => Promise<FormData>;
        /**
         * The headers of the response.
         */
        headers: Headers;
        /**
         * A boolean indicating whether the request was successful.
         */
        ok: boolean;
        /**
         * A boolean indicating whether the request was redirected.
         */
        redirected: boolean;
        /**
         * The status code of the response.
         */
        status: number;
        /**
         * The status message of the response.
         */
        statusText: string;
        /**
         * Sends an HTTP request and returns the response as text.
         */
        text: () => Promise<string>;
        /**
         * The type of the response.
         */
        type: ResponseType;
        /**
         * The URL of the response.
         */
        url: string;
        /**
         * Sends an HTTP request and returns the response object.
         * @returns The parsed JSON response.
         * @throws {Error} If the response body is not valid JSON or does not match the provided schema.
         */
        json: () => Promise<z.infer<typeof responseSchema>>;
    }>;
    /**
     * Returns the response schema defined in the `tsFetch` function.
     *
     * @returns The response schema defined in the `tsFetch` function.
     */
    responseType: () => T;
};

export { tsFetch as default };
