import { ApplicationFlags, Permissions, UserFlags } from "@discokit/bitfields";
import { OAuth2Scope } from "../oauth2";
import { APITeam } from "../resources/team";
import { Snowflake } from "../snowflake";

/**
 * https://discord.com/developers/docs/resources/application#application-object-application-structure
 */
export type APIApplication = {
  id: Snowflake;
  name: string;
  icon: string | null;
  description: string;
  rpc_origins?: string[];
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner?: APIApplicationOwner;
  /** @deprecated will be removed in v11. */
  summary: string;
  verify_key: string;
  team: APITeam | null;
  guild_id?: Snowflake;
  primary_sku_id?: Snowflake;
  slug?: string;
  cover_image?: string;
  flags?: number;
  tags?: string[];
  install_params?: APIApplicationInstallParams;
  custom_install_url?: string;
  role_connections_verification_url?: string;
};

export type APIApplicationOwner = {
  avatar: string | null;
  discriminator: string;
  flags: number;
};

/**
 * https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure
 */
export type APIApplicationInstallParams = {
  scopes: OAuth2Scope[];
  permissions: string;
};

/**
 * An application
 */
export type Application = {
  id: Snowflake;
  name: string;
  icon: string | null;
  description: string;
  rpcOrigins?: string[];
  botPublic: boolean;
  botRequireCodeGrant: boolean;
  termsOfServiceUrl?: string;
  privacyPolicyUrl?: string;
  owner?: ApplicationOwner;
  /** @deprecated will be removed in v11. */
  summary: string;
  verifyKey: string;
  team: APITeam | null;
  guildId?: Snowflake;
  primarySkuId?: Snowflake;
  slug?: string;
  coverImage?: string;
  flags?: ApplicationFlags;
  tags?: string[];
  installParams?: ApplicationInstallParams;
  customInstallUrl?: string;
  roleConnectionsVerificationUrl?: string;
};

/**
 * Partial user object containing info about
 * the owner of an application
 */
export type ApplicationOwner = {
  avatar: string | null;
  discriminator: string;
  flags: UserFlags;
};

/**
 * Default install params for an application
 */
export type ApplicationInstallParams = {
  scopes: OAuth2Scope[];
  permissions: Permissions;
};

export function transformApplication(application: APIApplication): Application {
  return {
    id: application.id,
    name: application.name,
    icon: application.icon,
    description: application.description,
    rpcOrigins: application.rpc_origins,
    botPublic: application.bot_public,
    botRequireCodeGrant: application.bot_require_code_grant,
    termsOfServiceUrl: application.terms_of_service_url,
    privacyPolicyUrl: application.privacy_policy_url,
    owner: application.owner && transformApplicationOwner(application.owner),
    summary: application.summary,
    verifyKey: application.verify_key,
    team: application.team,
    guildId: application.guild_id,
    primarySkuId: application.primary_sku_id,
    slug: application.slug,
    coverImage: application.cover_image,
    flags: application.flags,
    tags: application.tags,
    installParams:
      application.install_params &&
      transformApplicationInstallParams(application.install_params),
    customInstallUrl: application.custom_install_url,
    roleConnectionsVerificationUrl:
      application.role_connections_verification_url,
  };
}

export function transformApplicationOwner(
  owner: APIApplicationOwner
): ApplicationOwner {
  return {
    avatar: owner.avatar,
    discriminator: owner.discriminator,
    flags: owner.flags,
  };
}

export function transformApplicationInstallParams(
  installParams: APIApplicationInstallParams
): ApplicationInstallParams {
  return {
    scopes: installParams.scopes,
    permissions: BigInt(installParams.permissions),
  };
}
