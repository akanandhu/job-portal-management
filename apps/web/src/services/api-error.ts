type ApiErrorDataI = {
  message?: unknown;
};

const hasMessage = (data: unknown): data is ApiErrorDataI =>
  typeof data === "object" && data !== null && "message" in data;

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (typeof error === "object" && error !== null) {
    if ("data" in error && hasMessage(error.data) && typeof error.data.message === "string") {
      return error.data.message;
    }

    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return fallbackMessage;
}
