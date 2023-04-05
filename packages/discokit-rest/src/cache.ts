import { Client, FetchOptions, Snowflake } from "./common";
import { User } from "./endpoints";
import { DiscordRESTError } from "./error";

/**
 * A cache type
 */
export type CacheType = "user" | "guild" | "guildMember" | "channel" | "emoji";

/**
 * A map of {@link CacheType} to the corresponding type
 */
export interface CacheValues {
  user: User;
  guild: User;
  channel: User;
  guildMember: User;
  emoji: User;
}

/**
 * A cache
 */
export type Cache = {
  [K in CacheType]?: Map<Snowflake, CacheValues[K]>;
};

/**
 * Creates a cache
 */
export function makeCache(types: CacheType[]): Cache {
  const cache: Cache = {};
  for (const type of types) {
    cache[type] = new Map();
  }
  return cache;
}

/**
 * Gets the cache from a {@link Client}
 */
export function getCache(client: Client): Cache | undefined {
  if ("cache" in client) return client.cache;
  return undefined;
}

/**
 * Caches a single resource, if the cache for that resource is
 * not enabled, it will be ignored.
 */
export function cacheResource<TType extends CacheType>(
  client: Client,
  type: TType,
  resource: CacheValues[TType]
) {
  getCache(client)?.[type]?.set(resource.id, resource);
  return resource;
}

/**
 * Caches an array of resources
 */
export function cacheResources<TType extends CacheType>(
  client: Client,
  type: TType,
  resources: CacheValues[TType][]
) {
  if (getCache(client)) {
    for (const resource of resources) {
      cacheResource(client, type, resource);
    }
  }
  return resources;
}

export interface GetFromCacheOrFetchOptions<TType extends CacheType> {
  id: Snowflake;
  fetchOptions?: FetchOptions;
  fetcher: () => Promise<CacheValues[TType]>;
}

/**
 * Gets a resource from the cache or fetches it using
 * the specified fetcher.
 */
export async function getFromCacheOrFetch<TType extends CacheType>(
  client: Client,
  type: TType,
  options: GetFromCacheOrFetchOptions<TType>
): Promise<CacheValues[TType] | undefined> {
  const { id, fetchOptions, fetcher } = options;

  try {
    const { force = false, cacheOnly = false } = fetchOptions ?? {};

    if (force) return await fetcher();

    const cache = getCache(client);
    if (!cacheOnly) {
      if (!cache) return await fetcher();
    }

    const existing = cache?.[type]?.get(id);
    if (cacheOnly) return existing;
    if (existing) return existing;

    return await fetcher();
  } catch (e) {
    if (e instanceof DiscordRESTError && e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
}

export async function withCache<TType extends CacheType>(
  client: Client,
  type: TType,
  options: GetFromCacheOrFetchOptions<TType>
): Promise<CacheValues[TType] | undefined> {
  const { noCache } = options.fetchOptions ?? {};
  const result = await getFromCacheOrFetch(client, type, options);

  if (noCache || !result) {
    return result;
  } else {
    return cacheResource(client, type, result);
  }
}
