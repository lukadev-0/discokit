import { Snowflake } from "../../snowflake";
import { TeamMembershipState } from "./team-types";

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export type APITeam = {
  icon: string | null;
  id: Snowflake;
  members: APITeamMember[];
  name: string;
  owner_user_id: Snowflake;
};

/** https://discord.com/developers/docs/topics/teams#data-models-team-member-object */
export type APITeamMember = {
  membership_state: TeamMembershipState;
  permissions: string[];
  team_id: Snowflake;
  user: APITeamMemberUser;
};

/** https://discord.com/developers/docs/topics/teams#data-models-team-member-object */
export type APITeamMemberUser = {
  avatar: string | null;
  discriminator: string;
  id: Snowflake;
  username: string;
};
