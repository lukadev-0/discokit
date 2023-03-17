/**
 * Represents an error from the Discord API
 */
export class DiscordRESTError extends Error {
  name = "DiscordRESTError";

  constructor(
    public statusCode: number,
    public statusText: string,
    public response: unknown
  ) {
    const formattedError =
      response && typeof response == "object"
        ? formatDiscordError(response)
        : String(response);

    super(
      `Request failed with ${statusCode} (${statusText}): ${formattedError}`
    );
  }
}

function formatPath(path: string[]) {
  let result = "";
  for (const segment of path) {
    if (segment.match(/^\d/)) {
      result += segment.match(/^\d+$/) ? `[${segment}]` : `["${segment}"]`;
    } else {
      result += result === "" ? segment : `.${segment}`;
    }
  }
  return result;
}

function formatDiscordErrorObject(path: string[], errorObject: object) {
  let errors: string[] = [];

  if ("_errors" in errorObject && Array.isArray(errorObject._errors)) {
    for (const error of errorObject._errors) {
      errors.push(
        `${path.length === 0 ? "" : `<${formatPath(path)}> `}[${
          error.code
        }]: "${error.message}"`
      );
    }
  }

  for (const [key, value] of Object.entries(errorObject)) {
    if (key !== "_errors" && typeof value == "object") {
      errors = [...errors, ...formatDiscordErrorObject([...path, key], value)];
    }
  }

  return errors;
}

function formatDiscordError(response: object) {
  if (!("message" in response) || typeof response.message !== "string")
    return "Unknown Error";

  if (!("code" in response)) return `"${response.message}"`;

  if (
    !("errors" in response) ||
    !response.errors ||
    typeof response.errors !== "object"
  )
    return `"${response.message}" (code ${response.code})`;

  const errors = formatDiscordErrorObject([], response.errors);
  return `"${response.message}" (code ${response.code}):\n${errors
    .map((v) => `  ${v}`)
    .join("\n")}`;
}
