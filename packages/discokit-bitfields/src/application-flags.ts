/**
 * An application flag
 * @see https://discord.com/developers/docs/resources/application#application-object-application-flags
 */
export const ApplicationFlag = {
  GatewayPresence: 1 << 12,
  GatewayPresenceLimited: 1 << 13,
  GatewayGuildMembers: 1 << 14,
  GatewayGuildMembersLimited: 1 << 15,
  VerificationPendingGuildLimit: 1 << 16,
  Embedded: 1 << 17,
  GatewayMessageContent: 1 << 18,
  GatewayMessageContentLimited: 1 << 19,
  ApplicationCommandBadge: 1 << 23,
} as const;
