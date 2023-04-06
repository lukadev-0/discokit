# @discokit/types

Common Discord API types for Discokit

## API Types

There are two kinds of API types:

- **Raw API types**: These are prefixed with `API` and are the raw json bodies
  received from the Discord API (rest or gateway).

- **Discokit Types**: These don't have a prefix, and are the ones you'd receive
  from Discokit. These types have some differences from the raw API type, such
  as bigint bitfields like permissions being turned into from a string to a bigint,
  and snake_case is renamed to camelCase.

Using the `to` functions, such as `toUser`, you can convert a raw `APIUser` into
a Discokit `User`.

Not all types are contained in this package, some are specific to only REST APIs,
in which case they're available within `@discokit/rest`, and some are specific
to only gateway events, in which case they're available within `@discokit/gateway`.
