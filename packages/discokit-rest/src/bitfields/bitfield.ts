/**
 * A bitfield
 */
export abstract class BitField<T extends number | bigint> {
  protected abstract flags: T[];

  public bits: T;

  public static toBits<T extends number | bigint>(bits: T | BitField<T>): T {
    return typeof bits === "number" || typeof bits === "bigint"
      ? bits
      : bits.bits;
  }

  public constructor(bits: T | BitField<T>) {
    this.bits = BitField.toBits(bits);
  }

  public equals(bits: T | BitField<T>): boolean {
    return this.bits === BitField.toBits(bits);
  }

  public has(bits: T | BitField<T>): boolean {
    const b = BitField.toBits(bits);
    return (this.bits & b) === b;
  }

  public add(bits: T | BitField<T>): this {
    const b = BitField.toBits(bits);
    this.bits = (this.bits | b) as T;
    return this;
  }

  public remove(bits: T | BitField<T>): this {
    const b = BitField.toBits(bits);
    this.bits = (this.bits & ~b) as T;
    return this;
  }

  public toJSON() {
    return typeof this.bits === "number" ? this.bits : this.bits.toString();
  }

  *[Symbol.iterator]() {
    for (const flag of this.flags) {
      if (this.has(flag)) yield flag;
    }
  }
}

export function makeFlags<TValue extends number | bigint>() {
  return <TKeys extends string, TFlags extends { [K in TKeys]: TValue }>(
    flags: TFlags
  ) => {
    const obj = { ...flags };
    const names = new Map<TValue, string>();
    for (const [key, value] of Object.entries(flags)) {
      names.set(value as TValue, key);
    }

    Object.defineProperty(obj, "NAMES", { value: names });
    return obj as TFlags & { NAMES: Map<TValue, string> };
  };
}
