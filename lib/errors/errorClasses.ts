class MyError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

export class HTTPError extends MyError {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}
