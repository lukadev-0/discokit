import { readdirSync } from "fs";
import { join, parse } from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: Object.fromEntries(
    readdirSync("src/entrypoints").map((name) => [
      parse(name).name,
      join("src/entrypoints", name),
    ])
  ),
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["esm"],
});
