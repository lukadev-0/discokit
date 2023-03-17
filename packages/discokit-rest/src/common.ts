import { Cache } from "@/cache";
import { RESTClient } from "@/rest";

export type Client =
  | RESTClient
  | {
      rest: RESTClient;
      cache?: Cache;
    };

export type Snowflake = `${bigint}`;

export type Locale =
  | "id"
  | "en-US"
  | "en-GB"
  | "bg"
  | "zh-CN"
  | "zh-TW"
  | "hr"
  | "cs"
  | "da"
  | "nl"
  | "fi"
  | "fr"
  | "de"
  | "el"
  | "hi"
  | "hu"
  | "it"
  | "ja"
  | "ko"
  | "lt"
  | "no"
  | "pl"
  | "pt-BR"
  | "ro"
  | "ru"
  | "es-ES"
  | "sv-SE"
  | "th"
  | "tr"
  | "uk"
  | "vi";

export interface FetchOptions {
  /**
   * Skips the cache check, forces a fetch
   */
  force?: boolean;

  /**
   * Disables caching of the fetched result
   */
  noCache?: boolean;

  /**
   * Only get the value from the cache, ignored if `force`
   * is set
   */
  cacheOnly?: boolean;
}
