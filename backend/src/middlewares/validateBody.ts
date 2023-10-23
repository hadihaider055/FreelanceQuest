import { ObjectSchema } from "joi";
import { RequestHandler } from "express";

export const validateBody = (schema: ObjectSchema) => {
  const middleware: RequestHandler = (request, response, next) => {
    const hasBody = typeof request.body === "object";
    if (!hasBody) {
      return response.status(400).json({
        message: "Body is required",
        succuess: false,
      });
    }

    const { error } = schema.validate(request.body);
    if (error) {
      return response.status(400).json({
        success: false,
        message: error.details?.[0]?.message,
      });
    }

    next();
  };
  return middleware;
};
