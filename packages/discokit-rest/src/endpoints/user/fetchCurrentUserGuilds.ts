import { Client, Snowflake } from "@/common";
import { getRest } from "@/rest";
import { Permissions } from "@discokit/bitfields";

export interface FetchCurrentUserGuildsOptions {
  /**
   * Get guilds before this guild id
   */
  before?: Snowflake;

  /**
   * Get guilds after this guild id
   */
  after?: Snowflake;

  /**
   * Max number of guilds to return (1-200)
   */
  limit?: number;
}

export interface RawFetchCurrentUserGuildsResponse {
  id: Snowflake;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

export interface FetchCurrentUserGuildsResponse {
  id: Snowflake;
  name: string;
  icon: string;
  owner: boolean;
  permissions: Permissions;

  // TODO: add typings
  features: string[];
}

/**
 * Fetches the guilds of the authenticated user
 */
export async function fetchCurrentUserGuilds(
  client: Client,
  options?: FetchCurrentUserGuildsOptions
): Promise<FetchCurrentUserGuildsResponse[]> {
  const searchParams = new URLSearchParams();

  if (options?.before) searchParams.set("before", options.before);
  if (options?.after) searchParams.set("after", options.after);
  if (options?.limit) searchParams.set("limit", options.limit.toString());

  const response = await getRest(client).request<
    RawFetchCurrentUserGuildsResponse[]
  >(`/users/@me/guilds?${searchParams}`);

  return response.map<FetchCurrentUserGuildsResponse>((guild) => ({
    id: guild.id,
    name: guild.name,
    icon: guild.icon,
    owner: guild.owner,
    permissions: new Permissions(BigInt(guild.permissions)),
    features: guild.features,
  }));
}
