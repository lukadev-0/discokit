import { Snowflake } from "@discokit/types";
import { GatewayEventBasePayload } from "../..";

/**
 * @see https://discord.com/developers/docs/topics/gateway-events#ready-ready-event-fields
 */
export type GatewayReadyData = {
  v: number;
  user: unknown; // TODO
  guilds: unknown[]; // TODO
  session_id: string;
  resume_gateway_url: string;
  shard?: [shard_id: number, num_shards: number];
  application: GatewayReadyApplication;
};

export type GatewayReadyApplication = {
  id: Snowflake;
  flags: number;
};

/**
 * The ready event is dispatched when a client has completed the initial handshake with the gateway (for new sessions).
 * @see https://discord.com/developers/docs/topics/gateway-events#ready
 */
export type ReadyEvent = {
  /** The API version */
  apiVersion: number;

  /** Information about the user (including email) */
  user: unknown; // TODO

  /** Guilds the user is in */
  guilds: unknown; // TODO

  /** Used for resuming connections */
  sessionId: string;

  /** Used for resuming connections */
  resumeGatewayUrl: string;

  /** Shard information associated with this session, if sent when identifying */
  shard?: [shard_id: number, num_shards: number];

  /** A partial application object */
  application: GatewayReadyApplication;
};

/**
 * The ready event is dispatched when a client has completed the initial handshake with the gateway (for new sessions).
 * @see https://discord.com/developers/docs/topics/gateway-events#ready
 */
export type GatewayReady = GatewayEventBasePayload<GatewayReadyData>;
