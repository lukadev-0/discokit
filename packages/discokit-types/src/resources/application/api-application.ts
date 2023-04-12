import { OAuth2Scope } from "../../oauth2";
import { Snowflake } from "../../snowflake";
import { APITeam } from "../team";

/** https://discord.com/developers/docs/resources/application#application-object-application-structure */
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

/** https://discord.com/developers/docs/resources/application#application-object-application-structure */
export type APIApplicationOwner = {
  avatar: string | null;
  discriminator: string;
  flags: number;
  id: Snowflake;
  username: string;
};

/** https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure */
export type APIApplicationInstallParams = {
  scopes: OAuth2Scope[];
  permissions: string;
};
