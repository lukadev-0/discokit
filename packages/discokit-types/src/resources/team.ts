import { Snowflake } from "../snowflake";

/**
 * A team
 * https://discord.com/developers/docs/topics/teams#data-models-team-object
 */
export type APITeam = {
  icon: string | null;
  id: Snowflake;
  members: APITeamMember[];
  name: string;
  owner_user_id: Snowflake;
};

/**
 * A team member
 * https://discord.com/developers/docs/topics/teams#data-models-team-member-object
 */
export type APITeamMember = {
  membership_state: number;
  permissions: string[];
  team_id: Snowflake;
  user: APITeamMemberUser;
};

/**
 * A partial user containing info of a team member.
 */
export type APITeamMemberUser = {
  avatar: string | null;
  discriminator: string;
  id: Snowflake;
  username: string;
};

/**
 * A member's membership state on the team
 */
export enum APITeamMembershipState {
  Invited = 1,
  Accepted = 2,
}
