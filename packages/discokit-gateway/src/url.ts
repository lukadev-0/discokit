import { GatewayCompression, GatewayEncoding } from "./payload";

const API_VERSION = 10;

export type GatewayURLOptions = {
  url?: URL | string;
  apiVersion?: number;
  encoding: GatewayEncoding;
  compress?: GatewayCompression;
};

/**
 * Gets the websocket URL for the gateway.
 */
export async function getGatewayURL(
  options: GatewayURLOptions
): Promise<string> {
  const url = options.url
    ? options.url instanceof URL
      ? options.url
      : new URL(options.url)
    : // TODO: fetch URL from Discord
      new URL("wss://gateway.discord.gg/");

  url.searchParams.set("v", String(options.apiVersion ?? API_VERSION));
  url.searchParams.set("encoding", options.encoding);
  if (options.compress) url.searchParams.set("compress", options.compress);

  return url.href;
}
