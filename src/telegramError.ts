import { TelegramErrorResponse } from "./types";

export type TelegramErrorTypes =
    | "NetworkError"
    | "ApiError"
    | "TimeoutError"
    | "InternalServerError"
    | "ParsingError"
    | "UnhandledPromiseRejection"
    | "UnkownError";

export class TelegramError extends Error {
    error_code: string | undefined;
    type: TelegramErrorTypes;

    constructor(error: Error | TelegramErrorResponse| TelegramError, telegramErrorType: TelegramErrorTypes = "UnkownError") {
        if(error instanceof TelegramError){
            super(error.message);
            this.type = error.type;
            this.error_code = error.error_code;
            this.stack = error.stack;
        }else if( TelegramError.isErrnoException(error)){
            super(error.message);
            this.type = TelegramError.parseHttpsRequestError(error);
            this.error_code = error.code;
        }else if (error instanceof Error) {
            super(error.message);
            this.stack = error.stack;
            this.type = telegramErrorType;
        } else {
            super(error.description);
            this.error_code = error.error_code.toString();
            this.type = telegramErrorType;
        }
    }

    static parseHttpsRequestError(error: NodeJS.ErrnoException): TelegramErrorTypes {
        switch (error.code) {
            case 'ETIMEDOUT':
                return "TimeoutError";
            case 'ECONNRESET':
            case 'ECONNREFUSED':
            case 'ENETUNREACH':
                return "NetworkError";
            case 'EACCES':
            case 'EADDRINUSE':
                return "InternalServerError";
            default:
                return "UnhandledPromiseRejection";
        }
    }

    static isErrnoException(error: any): error is NodeJS.ErrnoException {
        return error instanceof Error && 
               'code' in error && 
               'errno' in error && 
               'syscall' in error;
    }
}


