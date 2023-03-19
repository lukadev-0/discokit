# @discokit/bitfields

Library for interacting with bitfields from the Discord API.

```ts
import { Permissions, Permission } from "@discokit/bitfields";

const permissions = new Permissions()
  .add(Permission.ReadMessageHistory)
  .add(Permission.AddReactions)
  .add(Permission.ViewChannel);

console.log(permissions.bits); // 66624n

for (const flag of perms) {
  const name = Permission.NAMES.get(flag);
  console.log(name); // AddReactions, ViewChannel, ReadMessageHistory
}
```
