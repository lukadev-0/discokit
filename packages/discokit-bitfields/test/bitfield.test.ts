import { describe, expect, it } from "vitest";
import {
  GatewayIntent,
  Permission,
  add,
  bitfieldKeys,
  bitfieldToJSON,
  bitfieldValues,
  has,
  subtract,
} from "../src";

describe("add()", () => {
  it("throws on empty arguments", () => {
    expect(() => add()).toThrowError(TypeError);
  });

  it("adds bitfields together", () => {
    expect(add(Permission.AddReactions)).toBe(Permission.AddReactions);

    expect(add(Permission.AddReactions, Permission.SendMessages)).toBe(
      Permission.AddReactions | Permission.SendMessages
    );

    expect(
      add(
        Permission.AddReactions,
        Permission.SendMessages,
        Permission.AttachFiles,
        Permission.ChangeNickname
      )
    ).toBe(
      Permission.AddReactions |
        Permission.SendMessages |
        Permission.AttachFiles |
        Permission.ChangeNickname
    );

    expect(
      add(GatewayIntent.GuildMembers, GatewayIntent.GuildMessageReactions)
    ).toBe(GatewayIntent.GuildMembers | GatewayIntent.GuildMessageReactions);
  });
});

describe("subtract()", () => {
  it("throws on empty arguments", () => {
    expect(() => subtract()).toThrowError(TypeError);
  });

  it("subtracts bitfields", () => {
    expect(subtract(Permission.Administrator)).toBe(Permission.Administrator);

    expect(
      subtract(
        Permission.Administrator | Permission.ManageChannels,
        Permission.Administrator
      )
    ).toBe(Permission.ManageChannels);

    expect(
      subtract(
        GatewayIntent.GuildMessages |
          GatewayIntent.GuildMembers |
          GatewayIntent.AutoModerationExecution |
          GatewayIntent.DirectMessageReactions,
        GatewayIntent.AutoModerationExecution,
        GatewayIntent.GuildMembers | GatewayIntent.GuildMessages
      )
    ).toBe(GatewayIntent.DirectMessageReactions);
  });
});

describe("has()", () => {
  it("checks if a bitfield has all the bits of another bitfield", () => {
    expect(
      has(
        GatewayIntent.GuildMessages |
          GatewayIntent.GuildMembers |
          GatewayIntent.AutoModerationConfiguration,
        GatewayIntent.GuildMessages | GatewayIntent.DirectMessages
      )
    ).toBe(false);

    expect(
      has(
        Permission.AddReactions | Permission.Administrator,
        Permission.Administrator
      )
    ).toBe(true);

    expect(
      has(
        Permission.AddReactions | Permission.Administrator,
        Permission.AddReactions | Permission.Administrator
      )
    ).toBe(true);
  });
});

describe("bitfieldValues()", () => {
  it("iterates over all bitfield values", () => {
    const arr = [
      ...bitfieldValues(
        Permission,
        Permission.AddReactions | Permission.Administrator
      ),
    ];

    expect(arr).toHaveLength(2);
    expect(arr).toContain(Permission.AddReactions);
    expect(arr).toContain(Permission.Administrator);
  });
});

describe("bitfieldKeys()", () => {
  it("iterates over all bitfield keys", () => {
    const arr = [
      ...bitfieldKeys(
        Permission,
        Permission.AddReactions | Permission.Administrator
      ),
    ];

    expect(arr).toHaveLength(2);
    expect(arr).toContain("AddReactions");
    expect(arr).toContain("Administrator");
  });
});

describe("bitfieldToJSON()", () => {
  it("returns a number for number bitfields", () => {
    const bitfield =
      GatewayIntent.GuildMembers | GatewayIntent.GuildIntegrations;
    expect(bitfieldToJSON(bitfield)).toBe(bitfield);
  });

  it("returns a string for bigint bitfields", () => {
    const bitfield = Permission.SendMessages | Permission.ViewChannel;
    expect(bitfieldToJSON(bitfield)).toBe(bitfield.toString());
  });
});
