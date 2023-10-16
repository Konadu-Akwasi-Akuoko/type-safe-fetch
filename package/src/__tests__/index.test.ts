import tsFetch from "../index";
import { z } from "zod";

function createMockReadableStream() {
  return new ReadableStream({
    start(controller) {
      controller.close();
    },
  });
}

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Test" }),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(32)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    text: () => Promise.resolve("Test"),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    type: "basic",
    url: "https://test.com",
    bodyUsed: false,
    headers: new Headers(),
    clone: jest.fn(),
    body: createMockReadableStream(),
  }),
);

describe("tsFetch", () => {
  it("query method should return correct data", async () => {
    const { query } = tsFetch({
      url: "https://test.com",
      responseSchema: z.object({
        message: z.string(),
      }),
    });

    const response = await query();

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect((await response.json()).message).toEqual("Test");
  });

  it("bodySchema method should return correct data", async () => {
    const { bodySchema: bodySchemaMethod } = tsFetch({
      url: "https://test.com",
      options: {},
      responseSchema: z.object({
        message: z.string(),
      }),
    });

    const { mutation } = bodySchemaMethod(
      z.object({
        key: z.string(),
      }),
    );

    const response = await mutation({ key: "Test" });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect((await response.json()).message).toEqual("Test");
  });

  it("mutation method should return correct data", async () => {
    const { mutation } = tsFetch({
      url: "https://test.com",
      options: {},
      responseSchema: z.object({
        message: z.string(),
      }),
    });

    const response = await mutation();

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect((await response.json()).message).toEqual("Test");
  });
});
