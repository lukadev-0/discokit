# @discokit/rest

> Work in progress!

Library for interacting with Discord's REST API.

```ts
import { DiscordREST, fetchCurrentUser } from "@discokit/rest";

const rest = new DiscordREST({
  auth: { bot: "MY_BOT_TOKEN" },
});

const user = await fetchCurrentUser(rest);

console.log(user);
// {
//   id: '1234567890',
//   username: "Example Bot",
//   discriminator: '1234',
//   avatar: null,
//   bot: true,
//   system: undefined,
//   mfaEnabled: true,
//   banner: null,
//   accentColor: null,
//   locale: 'en-US',
//   verified: true,
//   email: null,
//   flags: 0,
//   premiumType: 0,
//   publicFlags: 0
// }
```
