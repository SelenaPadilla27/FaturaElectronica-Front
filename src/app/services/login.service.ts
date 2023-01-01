import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from 'src/environments/environments';
import { Rutas } from '../utils/rutas';
import { Login } from '../models/login.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
     }
}
