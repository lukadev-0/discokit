import { DiscordREST, PermissionFlags, Permissions } from "./dist/index.js";

const TOKEN =
  "MTA4MTk2Mjk3NzAzODcwMDYwNQ.GiZ9fG.SlWui2odtJjKQwM3yhPF--KCbPhYxUgKlANf5Q";

const rest = new DiscordREST({
  auth: { bot: TOKEN },
});

// console.log(await fetchCurrentUser(rest));

// const guilds = await fetchCurrentUserGuilds(rest);
// console.log(guilds);
// console.log(guilds[0].permissions.flags);
// console.log(
//   [...guilds[0].permissions.flags].map((v) => PermissionFlags.NAMES.get(v))
// );

console.log(
  [
    ...new Permissions()
      .add(PermissionFlags.AddReactions)
      .add(PermissionFlags.CreateInstantInvite),
    // ]
  ].map((v) => PermissionFlags.NAMES.get(v))
);
