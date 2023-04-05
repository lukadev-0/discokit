import { describe, expect, it } from "vitest";
import { fetchCurrentUserGuilds } from "../../../src";
import { makeClient } from "../../mocks/client";
import { mockUserGuilds } from "../../mocks/handlers/users";

describe("fetchCurrentUserGuilds", () => {
  it("fetches the current user guilds", async () => {
    const rest = makeClient();

    const guilds = await fetchCurrentUserGuilds(rest);
    expect(guilds).toEqual(
      mockUserGuilds.map((guild) => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        owner: guild.owner,
        permissions: BigInt(guild.permissions),
        features: guild.features,
      }))
    );
  });
});
