import { fetchCurrentUser, fetchUser, makeCache, transformUser } from "@/.";
import { describe, expect, it } from "vitest";
import { makeClient } from "../../mocks/client";
import { mockUser } from "../../mocks/handlers/users";

describe("fetchCurrentUser", () => {
  it("fetches the current user", async () => {
    const rest = makeClient();

    const currentUser = await fetchCurrentUser(rest);
    expect(currentUser).toEqual(transformUser(mockUser));
  });

  it("caches the fetched user", async () => {
    const rest = makeClient();
    const cache = makeCache(["user"]);

    const currentUser = await fetchCurrentUser({ rest, cache });
    expect(currentUser).toBeDefined();
    expect(cache.user?.get(currentUser.id)).toBe(currentUser);

    const user = await fetchUser({ rest, cache }, currentUser.id);
    expect(user).toBe(currentUser);
  });

  it("skips caching", async () => {
    const rest = makeClient();
    const cache = makeCache(["user"]);

    const currentUser = await fetchCurrentUser(
      { rest, cache },
      { noCache: true }
    );
    expect(currentUser).toBeDefined();
    expect(cache.user?.get(currentUser.id)).toBeUndefined();

    const user = await fetchUser({ rest, cache }, currentUser.id);
    expect(user).toBeDefined();
    expect(user).not.toBe(currentUser);
  });
});
