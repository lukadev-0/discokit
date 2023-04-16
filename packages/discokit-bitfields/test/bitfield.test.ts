import { describe, expect, it } from "vitest";
import {
  bitfieldAdd,
  bitfieldHas,
  bitfieldKeys,
  bitfieldSubtract,
  bitfieldToJSON,
  bitfieldValues,
} from "../src";

const NumberBitfield = {
  A: 1 << 0,
  B: 1 << 1,
  C: 1 << 2,
  D: 1 << 3,
  E: 1 << 4,
  F: 1 << 5,
};

const BigIntBitfield = {
  A: 1n << 0n,
  B: 1n << 1n,
  C: 1n << 2n,
  D: 1n << 3n,
  E: 1n << 4n,
  F: 1n << 5n,
};

describe("bitfieldAdd()", () => {
  it("throws on empty arguments", () => {
    expect(() => bitfieldAdd()).toThrowError(TypeError);
  });

  it("adds bitfields together", () => {
    expect(bitfieldAdd(BigIntBitfield.A)).toBe(BigIntBitfield.A);

    expect(bitfieldAdd(BigIntBitfield.A, BigIntBitfield.B)).toBe(
      BigIntBitfield.A | BigIntBitfield.B
    );

    expect(
      bitfieldAdd(
        BigIntBitfield.A,
        BigIntBitfield.B,
        BigIntBitfield.C,
        BigIntBitfield.D
      )
    ).toBe(
      BigIntBitfield.A | BigIntBitfield.B | BigIntBitfield.C | BigIntBitfield.D
    );

    expect(bitfieldAdd(NumberBitfield.A, NumberBitfield.B)).toBe(
      NumberBitfield.A | NumberBitfield.B
    );
  });
});

describe("bitfieldSubtract()", () => {
  it("throws on empty arguments", () => {
    expect(() => bitfieldSubtract()).toThrowError(TypeError);
  });

  it("subtracts bitfields", () => {
    expect(bitfieldSubtract(BigIntBitfield.E)).toBe(BigIntBitfield.E);

    expect(
      bitfieldSubtract(BigIntBitfield.E | BigIntBitfield.F, BigIntBitfield.E)
    ).toBe(BigIntBitfield.F);

    expect(
      bitfieldSubtract(
        NumberBitfield.A |
          NumberBitfield.B |
          NumberBitfield.C |
          NumberBitfield.D,
        NumberBitfield.D,
        NumberBitfield.B | NumberBitfield.C
      )
    ).toBe(NumberBitfield.A);
  });
});

describe("bitfieldHas()", () => {
  it("checks if a bitfield has all the bits of another bitfield", () => {
    expect(
      bitfieldHas(
        NumberBitfield.F | NumberBitfield.A | NumberBitfield.B,
        NumberBitfield.F | NumberBitfield.E
      )
    ).toBe(false);

    expect(
      bitfieldHas(BigIntBitfield.A | BigIntBitfield.E, BigIntBitfield.E)
    ).toBe(true);

    expect(
      bitfieldHas(
        BigIntBitfield.A | BigIntBitfield.E,
        BigIntBitfield.A | BigIntBitfield.E
      )
    ).toBe(true);
  });
});

describe("bitfieldValues()", () => {
  it("iterates over all bitfield values", () => {
    const arr = [
      ...bitfieldValues(BigIntBitfield, BigIntBitfield.A | BigIntBitfield.E),
    ];

    expect(arr).toHaveLength(2);
    expect(arr).toContain(BigIntBitfield.A);
    expect(arr).toContain(BigIntBitfield.E);
  });
});

describe("bitfieldKeys()", () => {
  it("iterates over all bitfield keys", () => {
    const arr = [
      ...bitfieldKeys(BigIntBitfield, BigIntBitfield.A | BigIntBitfield.E),
    ];

    expect(arr).toHaveLength(2);
    expect(arr).toContain("A");
    expect(arr).toContain("E");
  });
});

describe("bitfieldToJSON()", () => {
  it("returns a number for number bitfields", () => {
    const bitfield = NumberBitfield.A | NumberBitfield.B;
    expect(bitfieldToJSON(bitfield)).toBe(bitfield);
  });

  it("returns a string for bigint bitfields", () => {
    const bitfield = BigIntBitfield.B | BigIntBitfield.A;
    expect(bitfieldToJSON(bitfield)).toBe(bitfield.toString());
  });
});
