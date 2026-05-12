export enum IApiErrors {
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

export default class ApiError {
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
