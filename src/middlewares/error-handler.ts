import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import multer from "multer";
import logger from "../helpers/logger";
import { ZodError } from "zod";
import { DrizzleError } from "drizzle-orm";

enum IApiErrors {
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  PAYMENT_REQUIRED = "Payment required",
  NOT_FOUND = "Resource not found",
  METHOD_NOT_ALLOWED = "Method not allowed",
  PAYLOAD_TOO_LARGE = "Payload too large",
  UNSUPPORTED_MEDIA = "Unsupported Media",
  UPGRADE_REQUIRED = "Upgrade Required",
  TOO_MANY_REQUESTS = "Too many requests",
  UNAVAILABLE_FOR_LEGAL_REASON = "Unavailable for legal reason",
  INTERNAL_SERVER_ERROR = "Something went wrong",
  BAD_GATEWAY = "Bad Gateway",
  SERVICE_UNAVAILABLE = "Service Unavailable",
  GATEWAY_TIMEOUT = "Gateway Timeout",
  INSUFFICIENT_STORAGE = "Insufficient Storage",
  INVALID_CREDS = "Incorrect Credentials",
  DUPLICATE_ENTRY = "Duplicate Entry Found",
}

export class ApiError {
  code: number;

  message: IApiErrors | string;

  constructor(code: number, message: IApiErrors | string) {
    this.code = code;
    this.message = message;
  }

  // Bad Request Error
  static badRequest() {
    return new ApiError(400, IApiErrors.BAD_REQUEST);
  }

  // Unauthorized Error
  static unAuthorized() {
    return new ApiError(401, IApiErrors.UNAUTHORIZED);
  }

  // Invalid Credentials
  static invalidCredentials() {
    return new ApiError(401, IApiErrors.INVALID_CREDS);
  }

  // Payment Required
  static paymentRequired() {
    return new ApiError(402, IApiErrors.PAYMENT_REQUIRED);
  }

  // Forbidden
  static forbidden() {
    return new ApiError(403, IApiErrors.FORBIDDEN);
  }

  // Not Found Error
  static notFound() {
    return new ApiError(404, IApiErrors.NOT_FOUND);
  }

  // Method Not Allowed
  static methodNotAllowed() {
    return new ApiError(405, IApiErrors.METHOD_NOT_ALLOWED);
  }

  // Payload too large
  static payloadTooLarge() {
    return new ApiError(413, IApiErrors.PAYLOAD_TOO_LARGE);
  }

  // Unsupported Media Type
  static unSupportedMedia() {
    return new ApiError(415, IApiErrors.UNSUPPORTED_MEDIA);
  }

  // Upgrade Required
  static upgradeRequired() {
    return new ApiError(426, IApiErrors.UPGRADE_REQUIRED);
  }

  // Too many requests
  static tooManyRequests() {
    return new ApiError(429, IApiErrors.TOO_MANY_REQUESTS);
  }

  // Unavailable for Legal Reason
  static unAvailableForLegal() {
    return new ApiError(451, IApiErrors.UNAVAILABLE_FOR_LEGAL_REASON);
  }

  // Internal Server Error
  static internal() {
    return new ApiError(500, IApiErrors.INTERNAL_SERVER_ERROR);
  }

  // Bad Gateway
  static badGateway() {
    return new ApiError(502, IApiErrors.BAD_GATEWAY);
  }

  // Service Unavailable
  static serviceUnavailable() {
    return new ApiError(503, IApiErrors.SERVICE_UNAVAILABLE);
  }

  // Gateway Timeout
  static gatewayTimeout() {
    return new ApiError(504, IApiErrors.GATEWAY_TIMEOUT);
  }

  // Insufficient Storage
  static insufficientStorage() {
    return new ApiError(507, IApiErrors.INSUFFICIENT_STORAGE);
  }

  // Duplicate Entry
  static duplicateEntry() {
    return new ApiError(422, IApiErrors.DUPLICATE_ENTRY);
  }

  // custom error
  static customError(code: number, message: string) {
    return new ApiError(code, message);
  }
}

export interface IExcelParseError {
  srNo: number;
  errors: {
    columnName: String;
    message: String;
  }[];
}
function errorHandlingMiddleWare(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Logging Error
  // logger.error(err);

  // API Error
  if (err instanceof ApiError) {
    return res.status(err.code).json({ status: err.code, data: null, error: err.message });
  }

  //ZodError V
  if (err instanceof ZodError) {
    // console.log("zod error");
    const errors: IExcelParseError[] = [];

    // Check if err.errors is an array
    if (Array.isArray(err.errors)) {
      err.errors.forEach((error, index) => {
        const columnName = error.path.join(".");
        const errorMessage = `${columnName} not found`;
        errors.push({
          srNo: index + 1,
          errors: [{ columnName, message: errorMessage }],
        });
      });
    } else {
      // Handle the case where err.errors is a single object
      const columnName = (err.errors as { path: string[] }).path.join(".");
      const errorMessage = `${columnName} not found`;
      errors.push({
        srNo: 1,
        errors: [{ columnName, message: errorMessage }],
      });
    }

    return res.status(422).json({ status: 422, data: null, error: errors });
  }

  // Drizzle Error Handling for Duplicate Entries
  if (err instanceof DrizzleError) {
    // Assuming DrizzleError has a property or method to identify duplicate entry errors
    if (err.message === "23505") {
      // Example code for unique violation in PostgreSQL
      return res.status(409).json({ status: 409, data: null, error: "Duplicate entry found" });
    }
  }

  // Send Internal Sever Error
  return res.status(500).json({ status: 500, error: IApiErrors.INTERNAL_SERVER_ERROR });
}
export default errorHandlingMiddleWare;
