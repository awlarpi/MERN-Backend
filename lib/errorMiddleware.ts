import { Request, Response, NextFunction } from "express"
import * as e from "./errorClasses"

// Error handling Middleware function for logging the error message
export function errorLogger(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`\x1b[91mERROR: ${error.message} \x1b[0m`)
  next(error) // calling next middleware
}

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export function errorResponder(
  error: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof e.HTTPError)
    return res.status(error.statusCode).json({ error: error.message })

  // if (_.has(error, "statusCode") && error.statusCode === 400)
  //   return res.status(error.statusCode).json({ error: "Bad request" })

  next(error)
}

export function failSafeHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  //res.status(400).json({ error: "bad request" })
  res.status(400).json({ error: error.message })
}
