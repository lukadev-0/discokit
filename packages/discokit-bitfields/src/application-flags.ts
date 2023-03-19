import { BitField, makeFlags } from "./bitfield";

const FLAGS = {
  GATEWAY_PRESENCE: 1 << 12,
  GATEWAY_PRESENCE_LIMITED: 1 << 13,
  GATEWAY_GUILD_MEMBERS: 1 << 14,
  GATEWAY_GUILD_MEMBERS_LIMITED: 1 << 15,
  VERIFICATION_PENDING_GUILD_LIMIT: 1 << 16,
  EMBEDDED: 1 << 17,
  GATEWAY_MESSAGE_CONTENT: 1 << 18,
  GATEWAY_MESSAGE_CONTENT_LIMITED: 1 << 19,
  APPLICATION_COMMAND_BADGE: 1 << 23,
} as const;

/**
 * An application flag
 * https://discord.com/developers/docs/resources/application#application-object-application-flags
 */
export const ApplicationFlag = makeFlags(FLAGS);

/**
 * Represents a set of gateway intents
 */
export class ApplicationFlags extends BitField<number> {
  protected flags = Object.values(FLAGS);

  public constructor(bits: number | BitField<number> = 0) {
    super(bits);
  }
}
