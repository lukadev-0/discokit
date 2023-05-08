import { GatewayEventBasePayload } from "../../payload";

/**
 * @see https://discord.com/developers/docs/topics/gateway-events#update-presence-gateway-presence-update-structure
 */
export type GatewayUpdatePresenceData = {
  since: number | null;
  activities: unknown[]; // TODO
  status: StatusType;
  afk: boolean;
};

/**
 * @see https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types
 */
export enum StatusType {
  Online = "online",
  DoNotDisturb = "dnd",
  Idle = "idle",
  Invisible = "invisible",
  Offline = "offline",
}

/**
 * Sent by the client to indicate a presence or status update.
 * @see https://discord.com/developers/docs/topics/gateway-events#update-presence
 */
export type GatewayUpdatePresence =
  GatewayEventBasePayload<GatewayUpdatePresenceData>;
