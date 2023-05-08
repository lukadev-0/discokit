import { GatewayEventBasePayload } from "../..";

/**
 * @see https://discord.com/developers/docs/topics/gateway-events#heartbeat
 */
export type GatewayHeartbeatData = number | null;

/**
 * Used to maintain an active gateway connection.
 * @see https://discord.com/developers/docs/topics/gateway-events#heartbeat
 */
export type GatewayHeartbeat = GatewayEventBasePayload<GatewayHeartbeatData>;
