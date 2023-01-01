import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Paciente } from 'src/app/models/mascota.models';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'Nombre_paciente',
    'Especie',
    'Raza',
    'Fecha_Nacimiento',
    'Color_Mascota',
    'Fecha_Registro',
    'Nombre_dueño'

  ];
  dataSource = new MatTableDataSource<Paciente>();
  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;

  constructor(private pacientesService: PacientesService, private  tokenService: TokenService, private router: Router) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {

    if(!this.tokenService.obtenerToken()){
      this.router.navigate(['login']);

    }


    this.dataSource.paginator = this.paginator;
    this.obtenerPaciente();
  }

  obtenerPaciente() {
    this.pacientesService.obtenerPacientes().subscribe((rta) => {
      if (rta && rta !== null) {
        this.dataSource.data = rta;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se encontraron pacientes',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  public cerrarSesion(): void {
    this.tokenService.eliminarToken();
    this.router.navigate(['login']);

    // todo
  }
}
