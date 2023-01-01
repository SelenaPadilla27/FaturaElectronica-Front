import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  guardarToken(token: string){
    localStorage.setItem("token", token);
  }
  obtenerToken(){
    const token = localStorage.getItem("token");
    return token;

  }
  eliminarToken(){
    localStorage.clear();
  }
}
