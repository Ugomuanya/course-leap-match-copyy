import { Request, Response, NextFunction } from 'express';
import { Logger } from 'pino';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler =
  (logger: Logger) =>
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Log error
    logger.error(
      {
        error: err.message,
        code: err.code,
        statusCode,
        path: req.path,
        method: req.method,
        stack: isDevelopment ? err.stack : undefined,
      },
      'Request error'
    );

    // Send error response
    res.status(statusCode).json({
      error: err.name || 'Error',
      message: err.message,
      statusCode,
      timestamp: new Date().toISOString(),
      ...(isDevelopment && { stack: err.stack }),
    });
  };

// Custom error class for API errors
export class AppError extends Error implements ApiError {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Common error factory functions
export const errors = {
  notFound: (resource: string) => new AppError(`${resource} not found`, 404, 'NOT_FOUND'),
  unauthorized: (message = 'Unauthorized') => new AppError(message, 401, 'UNAUTHORIZED'),
  forbidden: (message = 'Forbidden') => new AppError(message, 403, 'FORBIDDEN'),
  badRequest: (message = 'Bad Request') => new AppError(message, 400, 'BAD_REQUEST'),
  conflict: (message = 'Conflict') => new AppError(message, 409, 'CONFLICT'),
  internalServerError: (message = 'Internal Server Error') =>
    new AppError(message, 500, 'INTERNAL_SERVER_ERROR'),
};