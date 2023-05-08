import { GatewayOpcode } from "./opcode";

export type GatewayEncoding = "json" | "etf";
export type GatewayCompression = "zlib-stream";

export type GatewayEventBasePayload<T> = {
  op: GatewayOpcode;
  d: T;
};

export type GatewayEventDispatchPayload<T> = GatewayEventBasePayload<T> & {
  op: GatewayOpcode.Dispatch;
  s: number;
  t: string;
};

export type GatewayEventPayload<T> =
  | GatewayEventBasePayload<T>
  | GatewayEventDispatchPayload<T>;
