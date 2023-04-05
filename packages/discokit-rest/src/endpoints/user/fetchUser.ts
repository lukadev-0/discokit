import { withCache } from "../../cache";
import { Client, FetchOptions, Snowflake } from "../../common";
import { getRest } from "../../rest";
import { RawAPIUser, User, transformUser } from "./types";

/**
 * Fetches a user by id
 */
export async function fetchUser(
  client: Client,
  id: Snowflake,
  options?: FetchOptions
): Promise<User | undefined> {
  return withCache(client, "user", {
    id,
    fetchOptions: options,
    fetcher: async () => {
      const response = await getRest(client).request<RawAPIUser>(
        `/users/${id}`
      );

      return transformUser(response);
    },
  });
}
