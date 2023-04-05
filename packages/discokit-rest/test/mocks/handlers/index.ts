import { DefaultBodyType, MockedRequest, RestHandler } from "msw";
import { userHandlers } from "./users";

export const BASE_URL = "https://discord.com/api";

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  ...userHandlers,
];
