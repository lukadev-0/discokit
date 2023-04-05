import { Client } from "./common";

/**
 * Body of a request
 */
export type RESTRequestBody =
  | Blob
  | Buffer
  | URLSearchParams
  | FormData
  | NodeJS.ReadableStream
  | string;

/**
 * Headers of a request
 */
export type RESTRequestHeaders = Record<string, string>;

/**
 * HTTP request method
 */
export type RESTRequestMethod =
  | "DELETE"
  | "GET"
  | "HEAD"
  | "PATCH"
  | "POST"
  | "PUT";

/**
 * Options of a request
 */
export interface RESTRequestOptions {
  /**
   * The request body
   */
  body?: RESTRequestBody;

  /**
   * The request headers
   */
  headers?: RESTRequestHeaders;

  /**
   * The request method
   */
  method?: RESTRequestMethod;

  /**
   * Keys for rate limiting, this should be any top-level resources
   * https://discord.com/developers/docs/topics/rate-limits
   */
  rateLimitKeys?: string[];
}

/**
 * A rest client
 */
export interface RESTClient {
  request<TResponse>(
    url: string,
    options?: RESTRequestOptions
  ): Promise<TResponse>;
}

/**
 * Gets a {@link RESTClient} from a {@link Client}
 */
export function getRest(client: Client): RESTClient {
  if ("rest" in client) return client.rest;
  return client;
}
