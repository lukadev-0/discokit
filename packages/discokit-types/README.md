# @discokit/types

Common types for Discokit

## API Types

Types prefixed with `API` are raw objects from the Discord API.
Types with the same name, but without the `API` prefix are the ones you
will get from Discokit, these have been transformed by a transform function.

Transform functions are functions which take in a raw API object and returns
a Discokit object, certain types such as bitfields are then turned into the
appropiate bitfield class, and properties will be in camelCase.
