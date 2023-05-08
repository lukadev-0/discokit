import { GatewayEncoder } from "./encoder";

export const JSONEncoder: GatewayEncoder = {
  encoding: "json",

  encode: (payload) => JSON.stringify(payload),
  decode: async (data) =>
    JSON.parse(data instanceof Blob ? await data.text() : data),
};
