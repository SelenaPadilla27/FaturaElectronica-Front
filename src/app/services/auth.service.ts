import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Login, Token } from 'src/app/models/login.models';
import { Rutas } from 'src/app/utils/rutas';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(login: Login): Observable<Token> {
    return this.http.post<Token>(Rutas.POST_AUTH_LOGIN, login).pipe(
      tap(rta => rta.token !== 'FAIL' ? this.tokenService.guardarToken(rta.token): rta));
  }
}
