import { describe, expect, it } from "vitest";
import { createSnowflake, parseSnowflake } from "../src";

const SNOWFLAKE = "175928847299117063";
const TIMESTAMP = new Date("2016-04-30 11:18:25.796 UTC").getTime();
const WORKER_ID = 1n;
const PROCESS_ID = 0n;
const INCREMENT = 7n;

describe("createSnowflake()", () => {
  it("creates a snowflake", () => {
    const snowflake = createSnowflake({
      timestamp: TIMESTAMP,
      workerId: WORKER_ID,
      processId: PROCESS_ID,
      increment: INCREMENT,
    });

    expect(snowflake).toBe(SNOWFLAKE);
  });
});

describe("parseSnowflake()", () => {
  it("parses a snowflake", () => {
    const parsed = parseSnowflake(SNOWFLAKE);

    expect(parsed).toEqual({
      timestamp: new Date(TIMESTAMP),
      workerId: WORKER_ID,
      processId: PROCESS_ID,
      increment: INCREMENT,
    });
  });
});
