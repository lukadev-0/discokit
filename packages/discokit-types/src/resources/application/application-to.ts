import { toTeam } from "../team/team-to";
import {
  APIApplication,
  APIApplicationInstallParams,
  APIApplicationOwner,
} from "./application-api";
import {
  Application,
  ApplicationInstallParams,
  ApplicationOwner,
} from "./application-types";

export function toApplication(application: APIApplication): Application {
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
    owner: application.owner && toApplicationOwner(application.owner),
    summary: application.summary,
    verifyKey: application.verify_key,
    team: application.team && toTeam(application.team),
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

export function toApplicationOwner(
  owner: APIApplicationOwner
): ApplicationOwner {
  return {
    avatar: owner.avatar,
    discriminator: owner.discriminator,
    flags: owner.flags,
    id: owner.id,
    username: owner.username,
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
