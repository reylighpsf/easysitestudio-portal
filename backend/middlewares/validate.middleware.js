import { HttpError } from "../utils/http-error.js";

const toValidationMessage = (issues) =>
  issues
    .map((issue) => {
      const path = issue.path?.length ? `${issue.path.join(".")}: ` : "";
      return `${path}${issue.message}`;
    })
    .join("; ");

export const validate = (schema, target = "body") => (req, _res, next) => {
  const result = schema.safeParse(req[target]);

  if (!result.success) {
    const message = toValidationMessage(result.error.issues);
    next(new HttpError(400, message || "Data request tidak valid."));
    return;
  }

  req[target] = result.data;
  next();
};
