import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { LoginAuthService } from '../ui/identity/login-auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private loginAuthService: LoginAuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message(
              'You are not authorized for this action.',
              'No Authorization',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );

            this.loginAuthService
              .refrehTokenLogin(localStorage.getItem('refreshToken'))
              .then((data) => {});
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'Cannot reach the server.',
              'Server Error',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'Invalid request made',
              'Invalid request',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message('Action was not found.', 'Not Found', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopCenter,
            });
            break;
          default:
            this.toastrService.message(
              'An unexpected error occurred.',
              'Error',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            break;
        }
        return of(error);
      })
    );
  }
}
