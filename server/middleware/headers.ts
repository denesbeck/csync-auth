import { NextFunction, Request, Response } from "express";

export const headersMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.removeHeader("X-Powered-By");
  next();
};
