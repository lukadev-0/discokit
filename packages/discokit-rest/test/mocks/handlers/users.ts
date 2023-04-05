import { DefaultBodyType, MockedRequest, RestHandler, rest } from "msw";
import { RawAPIUser, RawFetchCurrentUserGuildsResponse } from "../../../src";
import { BASE_URL } from "../client";

export const mockUser: RawAPIUser = {
  id: "1234567890",
  username: "Mock User",
  discriminator: "0000",
  avatar: null,
  bot: true,
  system: undefined,
  mfa_enabled: true,
  banner: null,
  accent_color: null,
  locale: "en-US",
  verified: true,
  email: null,
  flags: 0,
  premium_type: 0,
  public_flags: 0,
};

export const mockUserGuilds: RawFetchCurrentUserGuildsResponse[] = [
  {
    id: "1234567890",
    name: "Example",
    icon: "",
    owner: true,
    permissions: "66624",
    features: ["COMMUNITY", "NEWS"],
  },
  {
    id: "23209430340",
    name: "Other Guild",
    icon: "",
    owner: true,
    permissions: "8",
    features: ["COMMUNITY", "NEWS"],
  },
];

export const userHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(`${BASE_URL}/users/@me`, (_, res, ctx) => {
    return res(ctx.json(mockUser));
  }),

  rest.get(`${BASE_URL}/users/@me/guilds`, (_, res, ctx) => {
    return res(ctx.json(mockUserGuilds));
  }),

  rest.get(`${BASE_URL}/users/:id`, (req, res, ctx) => {
    if (req.params.id === mockUser.id) {
      return res(ctx.json(mockUser));
    }

    return res(
      ctx.status(404),
      ctx.json({
        message: "Unknown User",
        code: 10013,
      })
    );
  }),
];
