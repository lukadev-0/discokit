import { DiscordRESTError } from "@/error";
import { RESTClient, RESTRequestOptions } from "@/rest";
import fetch from "node-fetch";

const DISCORD_API_BASE_URL = "https://discord.com/api/v10/";

export type DiscordRESTAuth = string | { bot: string } | { bearer: string };

export interface DiscordRESTOptions {
  baseURL?: string;
  auth: DiscordRESTAuth;
}

function getAuthHeader(auth: DiscordRESTAuth): string {
  if (typeof auth === "string") return auth;
  if (auth && typeof auth === "object") {
    if ("bot" in auth) return `Bot ${auth.bot}`;
    if ("bearer" in auth) return `Bearer ${auth.bearer}`;
  }

  throw new TypeError("Invalid auth option");
}

export class DiscordREST implements RESTClient {
  public baseURL: string;
  public authHeader: string;

  constructor(options: DiscordRESTOptions) {
    this.baseURL = options.baseURL ?? DISCORD_API_BASE_URL;
    this.authHeader = getAuthHeader(options.auth);
  }

  private joinURL(base: string, relative: string) {
    return base.replace(/\/+$/, "") + "/" + relative.replace(/^\/+/, "");
  }

  async request<TResponse>(
    url: string,
    options: RESTRequestOptions = {}
  ): Promise<TResponse> {
    const response = await fetch(this.joinURL(this.baseURL, url), {
      body: options.body,
      headers: {
        Authorization: this.authHeader,
        ...options.headers,
      },
      method: options.method,
    });

    if (!response.ok)
      throw new DiscordRESTError(
        response.status,
        response.statusText,
        await response.json().catch(() => "Unknown Error")
      );

    return (await response.json()) as TResponse;
  }
}
