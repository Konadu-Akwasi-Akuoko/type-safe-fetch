import { ZodType, ZodTypeAny, z } from "zod";

// Proposed fetch needs apiRequestSchema if there is a body, apiResponseSchema, url, methods, and body
async function main() {
  async function proposedFetch<T extends ZodTypeAny>({
    url,
    options,
    responseSchema,
  }: {
    url: string;
    options: Omit<RequestInit, "body">;
    responseSchema: T;
  }) {
    // Create a function and return that function use an object
    return {
      query: async () => {
        const request = await fetch(url, options);
        const {
          body,
          bodyUsed,
          headers,
          ok,
          redirected,
          status,
          statusText,
          type,
          url: responseUrl,
        }: Response = request;

        return {
          arrayBuffer: request.arrayBuffer.bind(request),
          blob: request.blob.bind(request),
          body,
          bodyUsed,
          clone: request.clone.bind(request),
          formData: request.formData.bind(request),
          headers,
          ok,
          redirected,
          status,
          statusText,
          text: request.text.bind(request),
          type,
          url: responseUrl,
          json: async () => {
            const data: z.infer<typeof responseSchema> = await request.json();
            return data;
          },
        };
      },
      bodySchema: function <U extends ZodTypeAny>(bodySchema: U) {
        return {
          mutation: async (body: z.infer<typeof bodySchema>) => {
            const request = await fetch(url, {
              ...options,
              body: JSON.stringify(body),
            });
            const data: z.infer<typeof responseSchema> = await request.json();
            return data;
          },
        };
      },
      // For a POST, PATCH, DELETE, mutation, etc request without a body
      mutation: async () => {
        const request = await fetch(url, options);
        const data: z.infer<typeof responseSchema> = await request.json();
        return data;
      },
    };
  }

  // GET request
  const tsFetch = await proposedFetch({
    url: "http://localhost:3000/api/quotes",
    options: { method: "GET", cache: "no-cache" },
    responseSchema: z.object({
      endpoint: z.string(),
      method: z.string(),
      body: z.null(),
      data: z.object({
        quotes: z.array(
          z.object({ id: z.string(), text: z.string(), author: z.string() })
        ),
      }),
    }),
  });

  try {
    const response = await tsFetch.query();

    if (!response.ok) {
      throw new Error("Response is not okay");
    }
    // console.log(await response.body);
    // console.log((await response.json()).data.quotes);
    console.log(await response.text());
  } catch (e) {
    console.error("Error message:");
    console.log(e);
  }

  // POST request with a body
  const postFetch = await proposedFetch({
    url: "http://localhost:3000/api/quotes/add-quote",
    options: {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    },
    responseSchema: z.object({
      endpoint: z.string(),
      method: z.string(),
      body: z.any(),
      data: z.object({ text: z.string(), author: z.string() }),
    }),
  });

  const postResponse = await postFetch
    .bodySchema(
      z.object({
        text: z.string(),
        author: z.string(),
      })
    )
    .mutation({ author: "Konadu", text: "Hello World" });

  // console.log(postResponse);

  // POST without a body
  const postFetchWithoutBody = await proposedFetch({
    url: "http://localhost:3000/api/quotes/add-quote-copy",
    options: {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    },
    responseSchema: z.object({
      endpoint: z.string(),
      method: z.string(),
      body: z.any(),
      data: z.object({ text: z.string(), author: z.string() }),
    }),
  });

  const postResponseWithoutBody = await postFetchWithoutBody.mutation();

  // console.log(postResponseWithoutBody);
}

main();

// Test function
// function test(a: number) {
//   console.log(a);
//   return {
//     data: (b: string) => {
//       console.log(b);

//       return b;
//     },
//   };
// }

// test(1).data("test");
