import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  retry,
  throwError,
  mergeMap,
  of
} from 'rxjs';
@Injectable()
export class InterceptorService implements HttpInterceptor {
  errorResponse$ = new BehaviorSubject<any>({});
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('token') as string;
    let authReq :HttpRequest<any> = req;
    if(token != null) authReq = req.clone({
      setHeaders: {
          Authorization: `Bearer ${token}`
      }
    });
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      //handling error from server and client
      catchError((error: HttpErrorResponse) => {
        let errorMessage = ' ';
        if(error.status== 401){
          sessionStorage.removeItem('id');
          sessionStorage.removeItem('token');
        }
        if (error.error instanceof ErrorEvent) {
          errorMessage = `error : ${error.error.message} ${error.name}`;
        } else {
          errorMessage = error.error;
        }
        return throwError(() => of(errorMessage));
      })
    );
  }
}
