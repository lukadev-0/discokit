import { BitField, makeFlags } from "./bitfield";

const FLAGS = {
  Guilds: 1 << 0,
  GuildMembers: 1 << 1,
  GuildModeration: 1 << 2,
  GuildEmojisAndStickers: 1 << 3,
  GuildIntegrations: 1 << 4,
  GuildWebhooks: 1 << 5,
  GuildInvites: 1 << 6,
  GuildVoiceStates: 1 << 7,
  GuildPresences: 1 << 8,
  GuildMessages: 1 << 9,
  GuildMessageReactions: 1 << 10,
  GuildMessageTyping: 1 << 11,
  DirectMessages: 1 << 12,
  DirectMessageReactions: 1 << 13,
  DirectMessageTyping: 1 << 14,
  MessageContent: 1 << 15,
  GuildScheduledEvents: 1 << 16,
  AutoModerationConfiguration: 1 << 20,
  AutoModerationExecution: 1 << 21,
};

/**
 * A gateway intent
 * https://discord.com/developers/docs/topics/gateway#gateway-intents
 */
export const GatewayIntent = makeFlags(FLAGS);

/**
 * Represents a set of gateway intents
 */
export class GatewayIntents extends BitField<number> {
  protected flags = Object.values(FLAGS);

  public constructor(bits: number | BitField<number> = 0) {
    super(bits);
  }
}
