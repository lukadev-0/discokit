import { describe, expect, it } from "vitest";
import {
  GatewayIntent,
  Permission,
  bitfieldAdd,
  bitfieldHas,
  bitfieldKeys,
  bitfieldSubtract,
  bitfieldToJSON,
  bitfieldValues,
} from "../src";

describe("bitfieldAdd()", () => {
  it("throws on empty arguments", () => {
    expect(() => bitfieldAdd()).toThrowError(TypeError);
  });

  it("adds bitfields together", () => {
    expect(bitfieldAdd(Permission.AddReactions)).toBe(Permission.AddReactions);

    expect(bitfieldAdd(Permission.AddReactions, Permission.SendMessages)).toBe(
      Permission.AddReactions | Permission.SendMessages
    );

    expect(
      bitfieldAdd(
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
      bitfieldAdd(
        GatewayIntent.GuildMembers,
        GatewayIntent.GuildMessageReactions
      )
    ).toBe(GatewayIntent.GuildMembers | GatewayIntent.GuildMessageReactions);
  });
});

describe("bitfieldSubtract()", () => {
  it("throws on empty arguments", () => {
    expect(() => bitfieldSubtract()).toThrowError(TypeError);
  });

  it("subtracts bitfields", () => {
    expect(bitfieldSubtract(Permission.Administrator)).toBe(
      Permission.Administrator
    );

    expect(
      bitfieldSubtract(
        Permission.Administrator | Permission.ManageChannels,
        Permission.Administrator
      )
    ).toBe(Permission.ManageChannels);

    expect(
      bitfieldSubtract(
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

describe("bitfieldHas()", () => {
  it("checks if a bitfield has all the bits of another bitfield", () => {
    expect(
      bitfieldHas(
        GatewayIntent.GuildMessages |
          GatewayIntent.GuildMembers |
          GatewayIntent.AutoModerationConfiguration,
        GatewayIntent.GuildMessages | GatewayIntent.DirectMessages
      )
    ).toBe(false);

    expect(
      bitfieldHas(
        Permission.AddReactions | Permission.Administrator,
        Permission.Administrator
      )
    ).toBe(true);

    expect(
      bitfieldHas(
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
