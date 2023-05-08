import { GatewayIntents } from "../../intents";
import { GatewayEventBasePayload } from "../../payload";
import { GatewayUpdatePresenceData } from "./update-presence";

/**
 * @see https://discord.com/developers/docs/topics/gateway-events#identify
 */
export type GatewayIdentifyData = {
  token: string;
  properties: GatewayIdentifyConnectionProperties;
  compress?: boolean;
  large_threshold?: number;
  shard?: [shard_id: number, num_shards: number];
  presence?: GatewayUpdatePresenceData;
  intents: GatewayIntents;
};

/**
 * @see https://discord.com/developers/docs/topics/gateway-events#identify
 */
export type GatewayIdentifyConnectionProperties = {
  os: string;
  browser: string;
  device: string;
};

/**
 * Used to trigger the initial handshake with the gateway.
 * @see https://discord.com/developers/docs/topics/gateway-events#identify
 */
export type GatewayIdentify = GatewayEventBasePayload<GatewayIdentifyData>;
