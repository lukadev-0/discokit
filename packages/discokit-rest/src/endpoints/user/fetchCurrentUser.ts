import { cacheResource } from "../../cache";
import { Client } from "../../common";
import { getRest } from "../../rest";
import { RawAPIUser, transformUser, User } from "./types";

export interface FetchCurrentUserOptions {
  noCache?: boolean;
}

/**
 * Fetches the currently authenticated user
 */
export async function fetchCurrentUser(
  client: Client,
  options?: FetchCurrentUserOptions
): Promise<User> {
  const response = await getRest(client).request<RawAPIUser>("/users/@me");
  const user = transformUser(response);

  if (!options?.noCache) cacheResource(client, "user", user);
  return user;
}
