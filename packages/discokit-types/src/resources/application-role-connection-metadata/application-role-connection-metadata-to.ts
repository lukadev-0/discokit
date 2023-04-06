import { APIApplicationRoleConnectionMetadata } from "./application-role-connection-metadata-api";
import { ApplicationRoleConnectionMetadata } from "./application-role-connection-metadata-types";

export function toApplicationRoleConnectionMetadata(
  metadata: APIApplicationRoleConnectionMetadata
): ApplicationRoleConnectionMetadata {
  return {
    type: metadata.type,
    key: metadata.key,
    name: metadata.name,
    nameLocalizations: metadata.name_localizations,
    description: metadata.description,
    descriptionLocalizations: metadata.description_localizations,
  };
}
