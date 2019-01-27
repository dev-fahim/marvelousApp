import { HttpErrorResponse } from '@angular/common/http';


export class AppError {
    constructor(private _error: HttpErrorResponse) { }
}

export class Unauthorized extends AppError {}
export class NotFound extends AppError {}
export class BadInput extends AppError {}
export class Forbidden extends AppError {}
export class ServerError extends AppError {}
export class UnexpectedError extends AppError {}

export function get_http_response_error(error: HttpErrorResponse) {
    if (error.status === 400) {
        return new BadInput(error);
    }
    if (error.status === 403) {
        return new Forbidden(error);
    }
    if (error.status === 401) {
        return new Unauthorized(error);
    }
    if (error.status === 500) {
        return new ServerError(error);
    }
    if (error.status === 404) {
        return new NotFound(error);
    }
    return new UnexpectedError(error);
} 

export function throw_http_response_error(error: AppError): {detail: string, type: string} {
    if (error instanceof BadInput) {
        return {detail: "You have entered some invalid data.", type: 'error'};
    }
    if (error instanceof Forbidden) {
        return {detail: "You are not permitted for this action.", type: 'error'};
    }
    if (error instanceof Unauthorized) {
        return {detail: "You are not authorized, please login.", type: 'error'};
    }
    if (error instanceof ServerError) {
        return {detail: "Sever recieved your request but not responsing.", type: 'error'};
    }
    if (error instanceof NotFound) {
        return {detail: "We could not find that.", type: 'error'};
    }
    return {detail: 'Something is not right.', type: 'error'}
}
