/**
 * A snowflake, used for IDs. Snowflakes contain
 * the time when it was generated.
 */
export type Snowflake = `${bigint}`;

/**
 * The Discord Epoch, which is the first second of 2015.
 */
export const DISCORD_EPOCH = 1420070400000;

/** https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right */
export type CreateSnowflakeOptions = {
  /**
   * Milliseconds since the Unix epoch
   * @default `Date.now()`
   */
  timestamp?: number;

  /**
   * Internal worker ID
   * @default `0n`
   */
  workerId?: bigint;

  /**
   * Internal process ID
   * @default `1n`
   */
  processId?: bigint;

  /**
   * A number that is incremented for every ID.
   *
   * NOTE: It is up to you to increment this number, it is not auto-incremented.
   *
   * @default `0n`
   */
  increment?: bigint;
};

/**
 * Creates a snowflake from the given options.
 */
export function createSnowflake(options?: CreateSnowflakeOptions): Snowflake {
  const {
    timestamp = Date.now(),
    workerId = 0n,
    processId = 1n,
    increment = 0n,
  } = options ?? {};

  const timestampBits = BigInt(timestamp - DISCORD_EPOCH) << 22n;
  const workerIdBits = (workerId & 0b11111n) << 17n;
  const processIdBits = (processId & 0b11111n) << 12n;
  const incrementBits = increment;

  return (
    timestampBits |
    workerIdBits |
    processIdBits |
    incrementBits
  ).toString() as Snowflake;
}

/** https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right */
export type ParsedSnowflake = {
  /** Timestamp */
  timestamp?: Date;

  /** Internal Worker ID */
  workerId?: bigint;

  /** Internal Process ID */
  processId?: bigint;

  /** Increment */
  increment?: bigint;
};

/**
 * Parses the snowflake into an object
 */
export function parseSnowflake(snowflake: Snowflake | bigint): ParsedSnowflake {
  return {
    timestamp: getSnowflakeTimestamp(snowflake),
    workerId: getSnowflakeWorkerId(snowflake),
    processId: getSnowflakeProcessId(snowflake),
    increment: getSnowflakeIncrement(snowflake),
  };
}

/**
 * Gets the timestamp of the snowflake
 */
export function getSnowflakeTimestamp(snowflake: Snowflake | bigint): Date {
  return new Date(Number(BigInt(snowflake) >> 22n) + DISCORD_EPOCH);
}

/**
 * Gets the worker id of the snowflake
 */
export function getSnowflakeWorkerId(snowflake: Snowflake | bigint): bigint {
  return (BigInt(snowflake) & 0x3e0000n) >> 17n;
}

/**
 * Gets the process id of the snowflake
 */
export function getSnowflakeProcessId(snowflake: Snowflake | bigint): bigint {
  return (BigInt(snowflake) & 0x1f000n) >> 12n;
}

/**
 * Gets the increment of the snowflake
 */
export function getSnowflakeIncrement(snowflake: Snowflake | bigint): bigint {
  return BigInt(snowflake) & 0xfffn;
}
