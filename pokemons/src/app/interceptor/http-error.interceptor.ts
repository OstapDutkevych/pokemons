import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) { }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.requestStarted()        
        return this.handler(next, httpRequest);
    }

    handler(next: any, request: any) {
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                this.spinnerService.requestEnded()
            }
        },
            (error: HttpErrorResponse) => {
                this.spinnerService.resetSpinner()
                throw error;
            }
        ))
    }
}