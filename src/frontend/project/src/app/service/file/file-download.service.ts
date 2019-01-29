import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import * as common from 'src/app/common';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private _http: HttpClient) { }

  public downloadResource(url: string): Observable<Blob> {
    return this._http.get<Blob>(LOCAL_REST_API_SERVER + url, { responseType: 'blob' as 'json' });
  }
}
