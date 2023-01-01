import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.agregarToken(request);
    return next.handle(request);
  }

  private agregarToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.obtenerToken();
    if (token) {
      const autReq = request.clone({
        headers: request.headers.set('Authorization', `${token}`)
      });

      return autReq;
    }
    return request;
  }

}
