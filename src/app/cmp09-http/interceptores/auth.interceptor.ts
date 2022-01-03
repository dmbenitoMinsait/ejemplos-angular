import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/cmp07-servicios/servicios/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log(`${request.method} - ${request.url}`)
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {

    
    if (this.authService.hasToken()){
      const token = this.authService.getToken()! // Exclamación para que confie el compilador de que el dato no vendrá vacío
      const headersConAuth = request.headers.append('Authorization', token)

      const reqWithAuth = request.clone({ headers: headersConAuth, })

      return next.handle(reqWithAuth)
    }
  }
    return next.handle(request);
  }
}
