import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente, Paciente } from 'src/app/models/mascota.models';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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
    'Nombre_dueño',
    'Acciones',
  ];

  dataSource = new MatTableDataSource<Paciente>();
  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;

  constructor(
    private pacientesService: PacientesService,
    private tokenService: TokenService,
    private router: Router,
    private matDialog: MatDialog
  ) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    if (!this.tokenService.obtenerToken()) {
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
  }
  public agregarPacientes() {
    this.matDialog.open(AgregarClienteComponent).afterClosed().subscribe(() => {
     this.obtenerPaciente();
    });
  }

  eliminarPaciente(id: number): void {
          Swal.fire({
          title: 'Esta seguro de eliminar Este Paciente',
          text: 'Esta accion no se puede revertir',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.pacientesService.eliminarPaciente(id).subscribe((rta) =>{
              if(rta) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Paciente eliminado con exito!',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.obtenerPaciente();
             }
             else{
              Swal.fire({
                icon: 'error',
                title: 'No se pudo eliminar el Paciente!',
                showConfirmButton: false,
                timer: 1500
              });
            }
        });
      }
    });
   }

   editarPaciente(editPaciente: Paciente){
    this.matDialog.open(AgregarClienteComponent, {
      data: { paciente: editPaciente, estado: true}
    }).afterClosed().subscribe(() => {
      this.obtenerPaciente();
     });
  }
}
