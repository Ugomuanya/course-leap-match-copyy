// src/middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'pino';

export const requestLogger =
  (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    // Capture the original res.json method
    const originalJson = res.json;

    // Override res.json to log response
    res.json = function (data: any) {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      // Log request/response
      const logLevel = statusCode >= 400 ? 'error' : 'info';
      logger[logLevel as 'info' | 'error'](
        {
          method: req.method,
          path: req.path,
          statusCode,
          duration: `${duration}ms`,
          query: req.query,
          // Don't log sensitive data
          body: req.body?.password ? { ...req.body, password: '***' } : req.body,
        },
        `${req.method} ${req.path} - ${statusCode}`
      );

      return originalJson.call(this, data);
    };

    next();
  };
