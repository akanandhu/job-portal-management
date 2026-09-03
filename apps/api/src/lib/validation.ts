import { ZodError } from "zod";

type ZodValidationOptionsI = {
  fallbackMessage: string;
  fallbackPath: string;
};

function getZodValidationMessage(error: ZodError, options: ZodValidationOptionsI) {
  const issue = error.issues[0];

  if (!issue) {
    return options.fallbackMessage;
  }

  const fieldName = issue.path.join(".") || options.fallbackPath;

  return `${fieldName}: ${issue.message}`;
}

export function parseWithZodValidation<Output>(
  parser: () => Output,
  createError: (message: string) => Error,
  options: ZodValidationOptionsI,
): Output {
  try {
    return parser();
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError(getZodValidationMessage(error, options));
    }

    throw error;
  }
}
