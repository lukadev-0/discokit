import { Locale, Snowflake } from "../../common";

export interface RawAPIUser {
  id: Snowflake;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner: string | null;
  accent_color?: number | null;
  locale?: Locale;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export interface User {
  id: Snowflake;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfaEnabled?: boolean;
  banner?: string | null;
  accentColor?: number | null;
  locale?: Locale;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premiumType?: number;
  publicFlags?: number;
}

/**
 * Transforms a raw user from the API into a user object
 */
export function transformUser(raw: RawAPIUser): User {
  return {
    id: raw.id,
    username: raw.username,
    discriminator: raw.discriminator,
    avatar: raw.avatar,
    bot: raw.bot,
    system: raw.system,
    mfaEnabled: raw.mfa_enabled,
    banner: raw.banner,
    accentColor: raw.accent_color,
    locale: raw.locale,
    verified: raw.verified,
    email: raw.email,
    flags: raw.flags,
    premiumType: raw.premium_type,
    publicFlags: raw.public_flags,
  };
}
