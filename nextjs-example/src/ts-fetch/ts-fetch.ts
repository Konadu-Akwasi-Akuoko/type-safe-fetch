import { z } from "zod";

// Proposed fetch needs apiRequestSchema if there is a body, apiResponseSchema, url, methods, and body

async function proposedFetch(
  url: string,
  options: Omit<RequestInit, "body">,
  requestBody: any
) {
  const apiRequestSchema = z.object({
    name: z.string(),
    age: z.number(),
  });

  const apiResponseSchema = z.object({ name: z.string() });

  type responseType = z.infer<typeof apiResponseSchema>;

  type bodyType = z.infer<typeof apiRequestSchema>;

  const body: bodyType = { name: "Konadu", age: 23 };

  const request = await fetch("https://example.com", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const response: responseType = await request.json();

  return response.name;
}

proposedFetch("https://example.com", { method: "POST" }, { name: "Konadu" });
