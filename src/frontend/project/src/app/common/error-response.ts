import { HttpErrorResponse } from '@angular/common/http';
import { UnAuthorized } from './unauthorized-error';
import { NotFound } from './not-found';
import { BadInput } from './bad-input';
import { Forbidden } from './forbidden';
import { AppError } from './app-error';
import { throwError } from 'rxjs';


export function errorResponse(error: HttpErrorResponse) {
    if (error.status === 401) {
        return throwError(new UnAuthorized(error.error));
    }
    if (error.status === 404) {
        return throwError(new NotFound(error.error));
    }
    if (error.status === 400) {
        return throwError(new BadInput(error.error));
    }
    if (error.status === 403) {
        return throwError(new Forbidden(error));
    }
    return throwError(new AppError(error));
}