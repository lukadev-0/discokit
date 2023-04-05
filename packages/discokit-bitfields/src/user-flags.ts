/**
 * A flag on a user's account
 * @see https://discord.com/developers/docs/resources/user#user-object-user-flags
 */
export const UserFlag = {
  Staff: 1 << 0,
  Partner: 1 << 1,
  Hypesquad: 1 << 2,
  BugHunterLevel1: 1 << 3,
  HypeSquadOnlineHouse1: 1 << 6,
  HypeSquadOnlineHouse2: 1 << 7,
  HypeSquadOnlineHouse3: 1 << 8,
  PremiumEarlySupporter: 1 << 9,
  TeamPseudoUser: 1 << 10,
  BugHunterLevel2: 1 << 14,
  VerifiedBot: 1 << 16,
  VerifiedDeveloper: 1 << 17,
  CertifiedModerator: 1 << 18,
  BotHTTPInteractions: 1 << 19,
  ActiveDeveloper: 1 << 22,
} as const;

export type UserFlags = number;
