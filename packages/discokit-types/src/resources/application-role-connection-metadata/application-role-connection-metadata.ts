import { Locale } from "../../locale";

/**
 * A representation of role connection metadata for an application.
 */
export type ApplicationRoleConnectionMetadata = {
  /** The type */
  type: ApplicationRoleConnectionMetadataType;

  /** Unique key */
  key: string;

  /** Name of the metadata field */
  name: string;

  /** Translations of the name */
  nameLocalizations?: Partial<Record<Locale, string>>;

  /** Description of the metadata field */
  description: string;

  /** Translations of the description */
  descriptionLocalizations?: Partial<Record<Locale, string>>;
};

/**
 * The type of an ApplicationRoleConnectionMetadata
 */
export enum ApplicationRoleConnectionMetadataType {
  IntegerLessThanOrEqual = 1,
  IntegerGreaterThanOrEqual = 2,
  IntegerEqual = 3,
  IntegerNotEqual = 4,
  DateTimeLessThanOrEqual = 5,
  DateTimeGreaterThanOrEqual = 6,
  BooleanEqual = 7,
  BooleanNotEqual = 8,
}
