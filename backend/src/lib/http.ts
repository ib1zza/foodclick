import type { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

export function asyncHandler<
  TRequest extends Request = Request,
  TResponse extends Response = Response,
>(
  handler: (req: TRequest, res: TResponse, next: NextFunction) => Promise<unknown>,
) {
  return (req: TRequest, res: TResponse, next: NextFunction) => {
    void handler(req, res, next).catch(next);
  };
}
