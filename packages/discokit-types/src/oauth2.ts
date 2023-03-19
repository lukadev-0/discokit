/**
 * https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
 */
export type OAuth2Scope =
  | "activities.read"
  | "activities.write"
  | "applications.builds.read"
  | "applications.builds.upload"
  | "applications.commands"
  | "applications.commands.update"
  | "applications.commands.permissions."
  | "applications.entitlements"
  | "applications.store.update"
  | "bot"
  | "connections"
  | "dm_channels.read"
  | "email"
  | "gdm.join"
  | "guilds"
  | "guilds.join"
  | "guilds.members.read"
  | "identify"
  | "messages.read"
  | "relationships.read"
  | "role_connections.write"
  | "rpc"
  | "rpc.activities.write"
  | "rpc.notifications.read"
  | "rpc.voice.read"
  | "rpc.voice.write"
  | "voice"
  | "webhook.incoming";

/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-redirect-url-example
 */
export type APIOauth2AuthorizationCodeTokenParams = {
  client_id: string;
  client_secret: string;
  grant_type: "authorization_code";
  code: string;
  redirect_uri: string;
};

/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response
 */
export type APIOauth2AuthorizationCodeTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example
 */
export type APIOauth2RefreshTokenParams = {
  client_id: string;
  client_secret: string;
  grant_type: "refresh_token";
  refresh_token: string;
};

/**
 * https://discord.com/developers/docs/topics/oauth2#client-credentials-grant-client-credentials-token-request-example
 */
export type APIOauth2ClientCredentialsTokenParams = {
  grant_type: "client_credentials";
  scope: string;
};

/**
 * https://discord.com/developers/docs/topics/oauth2#client-credentials-grant-client-credentials-access-token-response
 */
export type APIOauth2ClientCredentialsTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};
