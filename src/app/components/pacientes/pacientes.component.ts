import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente, Paciente } from 'src/app/models/mascota.models';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';



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
    private matDialog: MatDialog,
    private fileSaverService: FileSaverService
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


  downloadData() {
    const datePipe = new DatePipe("en-US");
    let date = new Date();
    let dateName = `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
    let reportName = `Reporte_Pacientes_${dateName}`;
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    let jsonObject:any = {};
    let jsonToDownload: any[] = [];
    let emptyFile = () => {
      jsonObject['Nombre del dueño'] = '';
      jsonObject['Tipo Identificación dueño'] = '';
      jsonObject['Identificación del dueño'] = '';
      jsonObject['Ciudad'] = '';
      jsonObject['teléfono'] = '';
      jsonObject['Nombre del Paciente'] = '';
      jsonObject['Fecha Nacimiento'] = '';
      jsonObject['Especie'] = '';
      jsonObject['Raza'] = '';
      jsonObject['Color'] = '';
      jsonObject['Fecha Registro'] = '';
      jsonToDownload.push(jsonObject);
    };

    if (this.dataSource) {
      if (this.dataSource.data && this.dataSource.data.length > 0) {
        this.dataSource.data.forEach((cd) => {

          jsonObject['Nombre del dueño'] = cd.mascota.cliente.nombre + ' ' + cd.mascota.cliente.apellido;
          jsonObject['Tipo Identificación dueño'] = cd.mascota.cliente.tipoId;
          jsonObject['Identificación del dueño'] = cd.mascota.cliente.numId;
          jsonObject['Ciudad'] = cd.mascota.cliente.ciudad;
          jsonObject['teléfono'] = cd.mascota.cliente.telefono;
          jsonObject['Nombre del Paciente'] = cd.mascota.nomMascota;
          jsonObject['Fecha Nacimiento'] = datePipe.transform(cd.mascota.fecNacMascota, 'dd/MM/yyyy');
          jsonObject['Especie'] = cd.mascota.especieMascota;
          jsonObject['Raza'] = cd.mascota.razaMascota;
          jsonObject['Fecha Registro'] = datePipe.transform(cd.fecRegistro, 'dd/MM/yyyy');;
          jsonToDownload.push(jsonObject);
          jsonObject = {};
        });
      } else {
        emptyFile();
      }
    } else {
      emptyFile();
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonToDownload);
    const workbook: XLSX.WorkBook = {Sheets: { 'Libro1': worksheet }, SheetNames: ['Libro1']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const data: Blob = new Blob([excelBuffer], {type: EXCEL_TYPE});
    this.fileSaverService.save(data, reportName + EXCEL_EXTENSION);

  }

}

