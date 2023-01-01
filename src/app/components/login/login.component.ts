import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { Login, Token } from 'src/app/models/login.models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2/public-api';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2/public-api';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  validarForm:Boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  InicioSeccion(login: Login) {
    this.authService.login(login).subscribe((rta) => {
     if(rta.token && rta.token !== 'FAIL'){
      this.router.navigate(['paciente'])
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se inicio sesión con exíto!',
        showConfirmButton: false,
        timer: 1500
      });

     }else{
      this.validarForm = true;
      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        showConfirmButton: false,
        timer: 1500
      });
     }
    });
  }

}
