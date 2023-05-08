import { GatewayEncoder } from "./encoder";
import { JSONEncoder } from "./encoder/json-encoder";
import { EventEmitter, waitForEvent } from "./event-emitter";
import { GatewayIdentify, GatewayIdentifyConnectionProperties } from "./events";
import { GatewayHelloData, HelloEvent } from "./events/receive/hello";
import { ReadyEvent } from "./events/receive/ready";
import { GatewayHeartbeat } from "./events/send/heartbeat";
import { GatewayIntents } from "./intents";
import { GatewayOpcode } from "./opcode";
import { GatewayEventDispatchPayload, GatewayEventPayload } from "./payload";
import {
  GatewayTransport,
  GatewayTransportContext,
  GatewayTransportInstance,
  WebSocketTransport,
} from "./transport";
import { getGatewayURL } from "./url";

/**
 * The events on the gateway.
 * @see https://discord.com/developers/docs/topics/gateway-events
 */
export type GatewayEvents = {
  raw: (payload: GatewayEventPayload<unknown>) => void;

  hello: (event: HelloEvent) => void;
  ready: (event: ReadyEvent) => void;
  heartbeatAck: () => void;
};

/**
 * Options for connecting to the gateway.
 */
export type GatewayConnectionOptions = {
  /**
   * The token to use for authentication
   */
  token: string;

  /**
   * The URL used to connect to the gateway, this will
   * fetch the url from Discord if not given.
   */
  url?: string | URL;

  /**
   * Connection properties
   * @see https://discord.com/developers/docs/topics/gateway-events#identify-identify-connection-properties
   *
   * @default
   * ```ts
   * {
   *   "os": "...",
   *   "browser": "discokit",
   *   "device": "discokit",
   * }
   * ```
   */
  properties?: Partial<GatewayIdentifyConnectionProperties>;

  /**
   * Sharding information
   */
  shard?: [shard_id: number, num_shards: number];

  // TODO: add presence

  /**
   * Gateway intents you wish to receive
   */
  intents: GatewayIntents;

  /**
   * The transport to use
   */
  transport?: GatewayTransport;

  /**
   * The encoder to use
   */
  encoder?: GatewayEncoder;
};

/**
 * The current state of the connection
 */
export type GatewayConnectionState =
  | "closed"
  | "connecting"
  | "connected"
  | "reconnecting";

/**
 * A connection to the Discord gateway
 * @see https://discord.com/developers/docs/topics/gateway#connections
 */
export type GatewayConnection = {
  /**
   * The options for the gateway connection
   */
  options: GatewayConnectionOptions;

  /**
   * An event emitter emitting {@link GatewayEvents}
   */
  events: EventEmitter<GatewayEvents>;

  /**
   * The last given sequence number.
   */
  lastSequence: number | null;

  /**
   * The state of the connection
   */
  connectionState: GatewayConnectionState;

  /**
   * The next heartbeat
   * @see https://discord.com/developers/docs/topics/gateway#sending-heartbeats
   */
  heartbeatTimeout?: NodeJS.Timeout;

  /**
   * The milliseconds in between heartbeats
   */
  heartbeatInterval?: number;

  /**
   * Whether a heartbeat ack has been received since
   * the last heartbeat sent
   */
  heartbeatAcknowledged: boolean;

  /**
   * The transport instance
   */
  transport?: GatewayTransportInstance;
};

/**
 * Creates a connection object, allowing you to
 * interact with the Discord gateway.
 */
export function createConnection(
  options: GatewayConnectionOptions
): GatewayConnection {
  const connection: GatewayConnection = {
    options: {
      ...options,
      transport: options.transport ?? WebSocketTransport(),
      encoder: options.encoder ?? JSONEncoder,
    },
    events: new EventEmitter() as EventEmitter<GatewayEvents>,
    lastSequence: null,
    heartbeatAcknowledged: false,
    connectionState: "closed",
  };

  return connection;
}

/**
 * Starts the given connection.
 * @see https://discord.com/developers/docs/topics/gateway#connections
 */
export async function startConnection(
  connection: GatewayConnection
): Promise<ReadyEvent> {
  const connectionContext: GatewayTransportContext = {
    connection: connection,

    getGatewayURL: (options = {}) =>
      getGatewayURL({
        url: connection.options.url,
        encoding: connection.options.encoder!.encoding,
        compress: connection.options.encoder!.compression,
        ...options,
      }),

    handleMessage: (data) =>
      handleMessage(connection, data).catch((err) => {
        console.error(`[Discokit] Failed to handle message: ${err}`);
      }),
    handleClose: () => console.error("CLOSED!"),
  };

  connection.transport = await connection.options.transport!(connectionContext);

  const [[event]] = await Promise.all([
    waitForEvent(connection.events, "ready"),
    sendIdentify(connection),
  ]);

  return event;
}

async function handleMessage(
  connection: GatewayConnection,
  data: string | Blob
) {
  const payload = await connection.options.encoder!.decode(data);

  connection.events.emit("raw", payload);

  switch (payload.op) {
    case GatewayOpcode.Hello: {
      const data = payload.d as GatewayHelloData;

      connection.events.emit("hello", {
        heartbeatInterval: data.heartbeat_interval,
      });
      connection.heartbeatInterval = data.heartbeat_interval;

      scheduleHeartbeat(connection, true);

      break;
    }

    case GatewayOpcode.HeartbeatAck: {
      connection.heartbeatAcknowledged = true;
      connection.events.emit("heartbeatAck");
      break;
    }

    case GatewayOpcode.Dispatch: {
      const dispatch = payload as GatewayEventDispatchPayload<unknown>;
      connection.lastSequence = dispatch.s;
      console.log("[DEBUG] Dispatch", dispatch);

      break;
    }

    default:
      console.error(`Received unknown opcode: ${payload.op}`);
      break;
  }
}

function scheduleHeartbeat(connection: GatewayConnection, isInitial = false) {
  if (!connection.heartbeatInterval)
    throw new Error("Attempt to schedule heartbeat before HELLO event");

  connection.heartbeatAcknowledged = false;
  connection.heartbeatTimeout = setTimeout(() => {
    if (!isInitial && !connection.heartbeatAcknowledged) {
      console.error("Heartbeat not acknowledged");
      connection.transport!.close(1002);
      // TODO: ATTEMPT RECONNECT!!!
      return;
    }
    sendHeartbeat(connection).catch((err) =>
      console.error(`[Discokit] Failed to send heartbeat: ${err}`)
    );
    scheduleHeartbeat(connection);
  }, connection.heartbeatInterval * (isInitial ? Math.random() : 1));
}

async function sendMessage<T>(
  connection: GatewayConnection,
  payload: GatewayEventPayload<T>
) {
  if (!connection.transport)
    throw new Error("Attempt to send message before connection is established");

  connection.transport.send(await connection.options.encoder!.encode(payload));
}

async function sendHeartbeat(connection: GatewayConnection) {
  const payload: GatewayHeartbeat = {
    op: 1,
    d: connection.lastSequence,
  };

  await sendMessage(connection, payload);
}

async function sendIdentify(connection: GatewayConnection) {
  const payload: GatewayIdentify = {
    op: 2,
    d: {
      token: connection.options.token,
      intents: connection.options.intents,
      properties: {
        os:
          connection.options.properties?.os ??
          (await import("node:os").then((os) => os.platform())),
        browser: connection.options.properties?.browser ?? "discokit",
        device: connection.options.properties?.browser ?? "discokit",
      },
    },
  };

  await sendMessage(connection, payload);
}
