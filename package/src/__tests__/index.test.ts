import { z } from "zod";
import { tsFetch } from "../index";

describe("tsFetch", () => {
  const baseUrl = "http://localhost:3000";
  it("perform a search", async () => {
    const { query } = tsFetch({
      url: `${baseUrl}/posts`,
      responseSchema: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          type: z.array(z.string()),
          hp: z.number(),
          attack: z.number(),
          defense: z.number(),
          special_attack: z.number(),
          special_defense: z.number(),
          speed: z.number(),
        }),
      ),
    });

    const fetchResponse = await query();
    const fetchData = await fetchResponse.json();
    expect(fetchData[0].id).toEqual(1);
  });
});
