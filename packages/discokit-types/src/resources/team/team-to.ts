import { APITeam, APITeamMember } from "./team-api";
import { Team, TeamMember } from "./team-types";

export function toTeam(team: APITeam): Team {
  return {
    icon: team.icon,
    id: team.id,
    members: team.members.map(toTeamMember),
    name: team.name,
    ownerUserId: team.owner_user_id,
  };
}

export function toTeamMember(member: APITeamMember): TeamMember {
  return {
    membershipState: member.membership_state,
    permissions: member.permissions,
    teamId: member.team_id,
    user: member.user,
  };
}
