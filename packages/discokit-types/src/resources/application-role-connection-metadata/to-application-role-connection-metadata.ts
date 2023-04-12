import { APIApplicationRoleConnectionMetadata } from "./api-application-role-connection-metadata";
import { ApplicationRoleConnectionMetadata } from "./application-role-connection-metadata";

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
