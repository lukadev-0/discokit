import { BitField } from "@/.";
import { describe, expect, it, test } from "vitest";

class NumberBitField extends BitField<number> {
  protected flags = [1 << 0, 1 << 1, 1 << 2, 1 << 3, 1 << 4, 1 << 5];
}

class BigIntBitField extends BitField<bigint> {
  protected flags = [
    1n << 0n,
    1n << 1n,
    1n << 2n,
    1n << 3n,
    1n << 4n,
    1n << 5n,
  ];
}

describe("BitField", () => {
  describe("BitField.toBits()", () => {
    it("works with a number", () => {
      expect(BitField.toBits(1 << 5)).toBe(1 << 5);
    });

    it("works with a BigInt", () => {
      expect(BitField.toBits(1n << 200n)).toBe(1n << 200n);
    });

    it("works with a BitField<number>", () => {
      expect(BitField.toBits(new NumberBitField(1 << 5))).toBe(1 << 5);
    });

    it("works with a BitField<bigint>", () => {
      expect(BitField.toBits(new BigIntBitField(5n))).toBe(5n);
    });
  });

  test(".equals()", () => {
    const a = new NumberBitField(1 << 0);
    const b = new NumberBitField(1 << 1);
    expect(a.equals(b)).toBe(false);

    const c = new NumberBitField(1 << 0);
    expect(a.equals(c)).toBe(true);
  });

  test(".has()", () => {
    const bitfield = new NumberBitField((1 << 1) | (1 << 2) | (1 << 3));
    expect(bitfield.has(1 << 2)).toBe(true);
    expect(bitfield.has((1 << 2) | (1 << 3))).toBe(true);
    expect(bitfield.has(1 << 4)).toBe(false);
    expect(bitfield.has((1 << 2) | (1 << 4))).toBe(false);
  });

  test(".add()", () => {
    const bitfield = new NumberBitField(1 << 4);
    bitfield.add(1 << 1);
    bitfield.add(1 << 2);

    expect(bitfield.bits).toBe((1 << 1) | (1 << 2) | (1 << 4));
  });

  test(".remove()", () => {
    const bitfield = new NumberBitField((1 << 1) | (1 << 2) | (1 << 3));
    bitfield.remove(1 << 2);

    expect(bitfield.bits).toBe((1 << 1) | (1 << 3));
  });

  describe(".toJSON()", () => {
    it("works with number", () => {
      const bitfield = new NumberBitField(1 << 1);
      expect(bitfield.toJSON()).toBe(1 << 1);
    });

    it("works with BigInt", () => {
      const bitfield = new BigIntBitField(1n << 1n);
      expect(bitfield.toJSON()).toBe(String(1n << 1n));
    });
  });

  test("@@iterator", () => {
    const bitfield = new NumberBitField((1 << 0) | (1 << 4) | (1 << 5));
    expect([...bitfield]).toEqual([1 << 0, 1 << 4, 1 << 5]);
  });
});
