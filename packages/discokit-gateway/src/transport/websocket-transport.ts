import { GatewayTransport } from "./transport";

/**
 * WebSocket constructor which should be mostly compatible between the
 * global WebSocket and the "ws" package.
 */
interface GatewayWebSocket {
  readonly CONNECTING: 0;
  readonly OPEN: 1;
  readonly CLOSING: 2;
  readonly CLOSED: 3;

  new (url: string | URL, protocols?: string | string[]): Omit<
    WebSocket,
    "dispatchEvent" | "binaryType"
  > & {
    binaryType: "blob";
  };

  prototype: Omit<
    (typeof globalThis)["WebSocket"]["prototype"],
    "dispatchEvent" | "binaryType"
  > & {
    binaryType: "blob";
  };
}

/**
 * Gets the websocket class, either the user-provided websocket,
 * the global websocket or the "ws" package.
 */
async function getWebSocketClass(
  websocket?: GatewayWebSocket
): Promise<GatewayWebSocket> {
  if (websocket) return websocket;
  if (globalThis.WebSocket) return globalThis.WebSocket as GatewayWebSocket;

  try {
    return import("ws").then(
      (mod) => mod.WebSocket as unknown as GatewayWebSocket
    );
  } catch (e) {
    throw new Error(
      `Failed to import 'ws', did you forget to install it?\n${
        e instanceof Error ? e.message : String(e)
      }`
    );
  }
}

export type WebSocketTransportOptions = {
  websocket?: GatewayWebSocket;
};

export function WebSocketTransport(
  options?: WebSocketTransportOptions
): GatewayTransport {
  return async (context) => {
    const { getGatewayURL, handleMessage, handleClose } = context;

    const webSocketClass = await getWebSocketClass(options?.websocket);
    const url = await getGatewayURL();

    const socket = new webSocketClass(url);

    socket.addEventListener("message", (e) => {
      handleMessage(e.data);
    });

    socket.addEventListener("close", (e) => {
      handleClose(e.code);
    });

    await new Promise((resolve, reject) => {
      socket.addEventListener("error", reject, { once: true });
      socket.addEventListener("open", resolve, { once: true });
    });

    return {
      send: (data) => {
        socket.send(data);
      },

      close: (code) => {
        socket.close(code);
      },
    };
  };
}
