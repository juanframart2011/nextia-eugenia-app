import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Agregar encabezados comunes
    const token = localStorage.getItem( 'token' );
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Agregar URL base
    const baseUrl =  environment.apiUrl; // Tu URL base
    const finalRequest = modifiedRequest.clone({
      url: `${baseUrl}${request.url}`,
    });

    // Continuar con la solicitud modificada
    return next.handle(finalRequest);
  }
}
