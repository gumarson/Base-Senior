

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  private get notification(): MessageService {
    return this.injector.get(MessageService);
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {


    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.outputData) {
            const response = event.body.outputData;
            if (response.responseCode !== 200) {
              this.sendError(response.message);
            }
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          console.log(errorMessage);
        }

        this.sendError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  sendError(message: string): void {
    this.notification.add({
      severity: 'error',
      summary: 'Erro de acesso',
      detail: message || 'Não foi possível efetuar a solicitação, tente novamente mais tarde!',
      sticky: true  });
  }

}
