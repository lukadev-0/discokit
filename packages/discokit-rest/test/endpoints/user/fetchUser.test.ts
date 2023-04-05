import { describe, expect, it } from "vitest";
import { fetchUser, makeCache, transformUser } from "../../../src";
import { makeClient } from "../../mocks/client";
import { mockUser } from "../../mocks/handlers/users";

describe("fetchUser", () => {
  it("fetches the user", async () => {
    const rest = makeClient();

    const user = await fetchUser(rest, mockUser.id);
    expect(user).toEqual(transformUser(mockUser));
  });

  it("returns undefined for users which don't exist", async () => {
    const rest = makeClient();

    const user = await fetchUser(rest, "0");
    expect(user).toBeUndefined();
  });

  it("caches the user", async () => {
    const rest = makeClient();
    const cache = makeCache(["user"]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = (await fetchUser({ rest, cache }, mockUser.id))!;
    expect(user).toBeDefined();
    expect(cache.user?.get(user.id)).toBe(user);
  });
});
