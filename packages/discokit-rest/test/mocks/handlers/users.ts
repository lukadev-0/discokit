import { RawAPIUser } from "@/.";
import { rest } from "msw";
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

export const userHandlers = [
  rest.get(`${BASE_URL}/users/@me`, (_, res, ctx) => {
    return res(ctx.json(mockUser));
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
