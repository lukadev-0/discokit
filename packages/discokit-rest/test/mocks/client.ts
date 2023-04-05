import { DiscordREST } from "../../src";

export const BASE_URL = "https://discord.com/api/mock";

export function makeClient() {
  return new DiscordREST({
    auth: "",
    baseURL: BASE_URL,
  });
}
