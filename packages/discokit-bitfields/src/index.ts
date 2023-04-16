/**
 * A bitfield, such as a set of permissions.
 */
export type BitField = number | bigint;

/**
 * Adds bitfields together.
 *
 * @param bitfields - The bitfields to add together
 * @returns The result of the addition
 *
 * @throws `TypeError` if no arguments are passed
 *
 * @example
 * ```ts
 * add(Permission.SendMessages, Permission.Speak, Permission.Connect);
 * ```
 */
export function bitfieldAdd<T extends BitField>(...bitfields: T[]): T {
  return bitfields.reduce((a, b) => (a | b) as T);
}

/**
 * Subtracts the bitfields from left to right.
 *
 * @param bitfields - The bitfields to subtract
 * @returns The result of the subtraction
 *
 * @throws `TypeError` if no arguments are passed
 *
 * @example
 * ```ts
 * const permissions = add(Permission.SendMessages, Permission.Connect);
 * subtract(permissions, Permission.Connect);
 * ```
 */
export function bitfieldSubtract<T extends BitField>(...bitfields: T[]): T {
  return bitfields.reduce((a, b) => (a & ~b) as T);
}

/**
 * Checks whether or not the given `bitfield` has all of the
 * bits of the bitfield `other`.
 *
 * @param bitfield - The bitfield to check in
 * @param other - The bitfield to check for
 * @returns `true` if `bitfield` contains all of the bits in `other`
 *
 * @example
 * ```ts
 * const permissions = add(Permission.SendMessages, Permission.Connect);
 * has(permissions, Permission.Connect); // true
 * ```
 */
export function bitfieldHas<T extends BitField>(
  bitfield: T,
  other: T
): boolean {
  return (bitfield & other) === other;
}

/**
 * Iterates over the value (e.g. `1 << 0`) of the flags of the bitfield.
 *
 * @param flags - The bitfield flags object (such as {@link Permission} or {@link GatewayIntent})
 *
 * @example
 * ```ts
 * const permissions = add(Permission.SendMessages, Permission.Connect);
 * for (const flag of bitfieldValues(permissions)) {
 *   console.log(flag);
 * }
 * ```
 */
export function* bitfieldValues<T extends BitField>(
  flags: Record<string, T>,
  bitfield: T
): Generator<T, void, unknown> {
  for (const flag of Object.values(flags)) {
    if (bitfieldHas(bitfield, flag)) {
      yield flag;
    }
  }
}

/**
 * Iterates over the keys (e.g. `"ManageGuild"`) of the flags of the bitfield.
 *
 * @param flags - The bitfield flags object (such as {@link Permission} or {@link GatewayIntent})
 *
 * @example
 * ```ts
 * const permissions = add(Permission.SendMessages, Permission.Connect);
 * for (const flag of bitfieldKeys(permissions)) {
 *   console.log(flag);
 * }
 * ```
 */
export function* bitfieldKeys<T extends BitField, TFlags extends string>(
  flags: Record<TFlags, T>,
  bitfield: T
): Generator<TFlags, void, unknown> {
  for (const key of Object.keys(flags) as TFlags[]) {
    if (bitfieldHas(bitfield, flags[key])) {
      yield key;
    }
  }
}

/**
 * Turns this bitfield into JSON, for numbers, it will remain untouched,
 * for `bigint`s, it will be turned into a string.
 *
 * @param bitfield - The bitfield
 * @returns A number if the bitfield is a number, a string if the bitfield is a bigint
 */
export function bitfieldToJSON<T extends BitField>(
  bitfield: T
): T extends number ? number : string {
  const result = typeof bitfield === "number" ? bitfield : bitfield.toString();
  return result as T extends number ? number : string;
}
