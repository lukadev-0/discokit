import { ApplicationFlags, Permissions, UserFlags } from "../../bitfields";
import { OAuth2Scope } from "../../oauth2";
import { Snowflake } from "../../snowflake";
import { Team } from "../team";

/**
 * An application
 */
export type Application = {
  /** The id of the app */
  id: Snowflake;

  /** The name of the app */
  name: string;

  /** The icon hash of the app */
  icon: string | null;

  /** The description of the app */
  description: string;

  /** An array of rpc url origins, if enabled */
  rpcOrigins?: string[];

  /** If false, only the app's owner can add the app's bot to guilds */
  botPublic: boolean;

  /** When true the app's bot will only join upon completion of the full oauth2 code grant flow */
  botRequireCodeGrant: boolean;

  /** The URL to the terms of service of the app */
  termsOfServiceUrl?: string;

  /** The URL to the privacy policy of the app */
  privacyPolicyUrl?: string;

  /** Partial user object containing information about the owner of the app */
  owner?: ApplicationOwner;

  /**
   * An empty string
   * @deprecated will be removed in v11.
   */
  summary: string;

  /** The hex encoded key for verification in interactions and the GameSDK's GetTicket */
  verifyKey: string;

  /** The team that this application belongs to (if any) */
  team: Team | null;

  /** If the application is sold on Discord, the id of the guild to which it is linked */
  guildId?: Snowflake;

  /** If the application is sold on Discord, this will be the id of the "Game SKU" (if it exists) */
  primarySkuId?: Snowflake;

  /** If the application is sold on Discord, the slug in the URL to the store page */
  slug?: string;

  /**	The application's default rich presence invite cover image hash */
  coverImage?: string;

  /** The application's public flags */
  flags?: ApplicationFlags;

  /** Up to 5 tags describing the content and functionaly of the application */
  tags?: string[];

  /** Settings for the application's default in-app authorization link, if enabled */
  installParams?: ApplicationInstallParams;

  /** The application's default authorization link, if enabled */
  customInstallUrl?: string;

  /** The application's role connection verification entry point */
  roleConnectionsVerificationUrl?: string;
};

/**
 * Partial user object containing info about
 * the owner of an application
 */
export type ApplicationOwner = {
  /** The user's avatar hash */
  avatar: string | null;

  /** The user's 4 digit tag */
  discriminator: string;

  /** The user's flags */
  flags: UserFlags;

  /** The user's id */
  id: Snowflake;

  /** The user's username */
  username: string;
};

/**
 * Settings for the application's default in-app authorization link
 */
export type ApplicationInstallParams = {
  /** The OAuth2 Scopes */
  scopes: OAuth2Scope[];

  /** The requested permissions */
  permissions: Permissions;
};
