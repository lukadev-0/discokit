import {
  GatewayCompression,
  GatewayEncoding,
  GatewayEventPayload,
} from "../payload";

/**
 * Handles encoding/decoding of messages from the
 * gateway
 */
export type GatewayEncoder = {
  /**
   * The encoding to use
   */
  encoding: GatewayEncoding;

  /**
   * The compression to use
   */
  compression?: GatewayCompression;

  /**
   * Encodes the given payload
   */
  encode: <T>(
    payload: GatewayEventPayload<T>
  ) => string | Blob | Promise<string | Blob>;

  /**
   * Decodes the given message
   */
  decode: <T>(
    data: string | Blob
  ) => GatewayEventPayload<T> | Promise<GatewayEventPayload<T>>;
};
