import { Snowflake } from "../../snowflake";

/**
 * A team
 */
export type Team = {
  /** The team's icon hash */
  icon: string | null;

  /** The id of the team */
  id: Snowflake;

  /** The team's members */
  members: TeamMember[];

  /** The name of the team */
  name: string;

  /** The id of the team's owner */
  ownerUserId: Snowflake;
};

/**
 * A member of a team
 */
export type TeamMember = {
  /** The state of membership of the team */
  membershipState: TeamMembershipState;

  /** Always ["*"] */
  permissions: string[];

  /** The id of the team that this member belongs to */
  teamId: Snowflake;

  /** A partial user object containg info about the team member */
  user: TeamMemberUser;
};

/**
 * A partial user object containing info about
 * a team member.
 */
export type TeamMemberUser = {
  /** The user's avatar hash */
  avatar: string | null;

  /** The 4 digit tag of the user */
  discriminator: string;

  /** The user's id */
  id: Snowflake;

  /** The user's username */
  username: string;
};

/**
 * A member's membership state on the team
 */
export enum TeamMembershipState {
  Invited = 1,
  Accepted = 2,
}
