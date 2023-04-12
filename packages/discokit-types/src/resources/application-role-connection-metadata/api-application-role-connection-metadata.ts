import { Locale } from "../../locale";
import { ApplicationRoleConnectionMetadataType } from "./application-role-connection-metadata";

/** https://discord.com/developers/docs/resources/application-role-connection-metadata */
export type APIApplicationRoleConnectionMetadata = {
  type: ApplicationRoleConnectionMetadataType;
  key: string;
  name: string;
  name_localizations?: Partial<Record<Locale, string>>;
  description: string;
  description_localizations?: Partial<Record<Locale, string>>;
};
