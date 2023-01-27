import { Request, Response, NextFunction } from "express"
import * as e from "./errorClasses"

// Error handling Middleware function for logging the error message
export function errorLogger(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`\x1b[91m${error}\x1b[0m`)
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

    next(error)
}

export function failSafeHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(400).json({ error: "bad request" })
}
