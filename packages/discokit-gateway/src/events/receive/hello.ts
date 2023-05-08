import { GatewayEventBasePayload } from "../..";

/**
 * @see https://discord.com/developers/docs/topics/gateway-events#hello-hello-structure
 */
export type GatewayHelloData = {
  heartbeat_interval: number;
};

/**
 * The first event sent by Discord upon connection
 * @see https://discord.com/developers/docs/topics/gateway-events#hello-hello-structure
 */
export type HelloEvent = {
  /**
   * Amount of milliseconds in between heartbeats
   */
  heartbeatInterval: number;
};

export type GatewayHello = GatewayEventBasePayload<GatewayHelloData>;
