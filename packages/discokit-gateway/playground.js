import { createConnection, startConnection } from "./dist/index.js";

const connection = createConnection({
  token:
    "MTEwNDc4NTUzNTM0MTQ0NTE1MA.G7yogL.iea13IKSgTZVDPIXC7AUsZ_1TVOz0bgr2vhleM",
  intents: 0,
});

connection.events.on("*", console.log);

startConnection(connection).then((...args) =>
  console.log("Connection started:", ...args)
);
