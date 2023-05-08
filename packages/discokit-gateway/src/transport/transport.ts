import { GatewayConnection } from "../connection";
import { GatewayURLOptions } from "../url";

/**
 * Responsible for connecting to the gateway
 */
export type GatewayTransport = (
  context: GatewayTransportContext
) => GatewayTransportInstance | Promise<GatewayTransportInstance>;

/**
 * Object returned from {@link GatewayTransport}
 */
export type GatewayTransportInstance = {
  send: (data: string | Blob) => void;
  close: (code?: number) => void;
};

/**
 * Context passed to {@link GatewayTransport.connect}
 */
export type GatewayTransportContext = {
  /**
   * The gateway connection
   */
  connection: GatewayConnection;

  /**
   * Gets the websocket URL for connecting to the gateway.
   *
   * You can overwrite options using the `options` argument.
   */
  getGatewayURL: (options?: Partial<GatewayURLOptions>) => Promise<string>;

  /**
   * Handles a message from the gateway
   */
  handleMessage: (data: string | Blob) => void;

  /**
   * Handles the connection closing
   */
  handleClose: (code: number) => void;
};
