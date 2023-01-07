import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { Cliente, Mascota, Paciente } from 'src/app/models/mascota.models';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, TitleStrategy } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PacienteEditable } from 'src/app/models/paciente-edit';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css'],
})
export class AgregarClienteComponent implements OnInit, AfterViewInit {
  step = 0;
  clienteForm!: FormGroup;
  mascotaForm!: FormGroup;
  validarForm: Boolean = false;
  cliente!: Cliente;
  mascota!: Mascota;
  paciente!: Paciente;
  data!: PacienteEditable;

  constructor(
    private router: Router,
    private pacientesService: PacientesService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: PacienteEditable
  ) {
    this.data = data;
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.cliente = {
      apellido: '',
      ciudad: '',
      direccion: '',
      id: 0,
      nombre: '',
      numId: '',
      telefono: '',
      tipoId: '',
    };
    this.mascota = {
      id: 0,
      nomMascota: '',
      fecNacMascota: new Date(),
      colorMascota: '',
      especieMascota: '',
      razaMascota: '',
      cliente: {
        apellido: '',
        ciudad: '',
        direccion: '',
        id: 0,
        nombre: '',
        numId: '',
        telefono: '',
        tipoId: '',
      },
    };

    this.paciente = {
      fecRegistro: new Date(),
      id: 0,
      mascota: {
        id: 0,
        nomMascota: '',
        fecNacMascota: new Date(),
        colorMascota: '',
        especieMascota: '',
        razaMascota: '',
        cliente: {
          apellido: '',
          ciudad: '',
          direccion: '',
          id: 0,
          nombre: '',
          numId: '',
          telefono: '',
          tipoId: '',
        },
      },
    };

    //Formulario Cliente
    this.clienteForm = new FormGroup({
      tipoId: new FormControl('', Validators.required),
      numId: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    });

    //Formulario Mascota
    this.mascotaForm = new FormGroup({
      nomMascota: new FormControl('', Validators.required),
      especieMascota: new FormControl('', Validators.required),
      razaMascota: new FormControl('', Validators.required),
      fecNacMascota: new FormControl('', Validators.required),
      colorMascota: new FormControl('', Validators.required),
    });

    this.editarCliente();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  //Calendario
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  cargarMascota(): void {
    this.mascota = this.mascotaForm.value;
    console.log(this.mascota);
  }

  cargarCliente(): void {
    this.cliente = this.clienteForm.value;
    console.log(this.cliente);
  }

  guardarDatos() {
    this.cargarMascota();
    this.cargarCliente();
    if (this.data.estado) {
      this.cliente.id = this.data.paciente.mascota.id;
      this.pacientesService
        .actualizarClientePorId(this.cliente.id, this.cliente)
        .subscribe((rta) => {
          if (rta && rta.id > 0) {
            this.mascota.id =  this.data.paciente.mascota.id;
            this.pacientesService
              .actualizarMascotaPorId(this.cliente.id, this.mascota)
              .subscribe((rta) => {
                if (rta && rta.id > 0) {
                  this.paciente.fecRegistro = new Date();
                  this.paciente.id = this.data.paciente.id;
                  this.pacientesService
                    .actualizarPacientePorId(this.mascota.id, this.paciente)
                    .subscribe((rta) => {
                      if (rta && rta.id > 0) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Datos del paciente actualizados con exito!',
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        this.matDialog.closeAll();
                      }else{
                        Swal.fire({
                          icon: 'error',
                          title: 'No se pudieron actualizar los datos del paciente!',
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'No se pudieron actualizar los datos del paciente!',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'No se pudieron actualizar los datos del paciente!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      this.pacientesService.registrarCliente(this.cliente).subscribe((rta) => {
        if (rta && rta.id > 0) {
          this.pacientesService
            .registrarMascota(rta.id, this.mascota)
            .subscribe((rta) => {
              if (rta && rta.id > 0) {
                this.pacientesService
                  .registrarPaciente(rta.id, this.paciente)
                  .subscribe((rta) => {
                    if (rta && rta.id > 0) {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Datos del paciente guardados con exito!',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      this.matDialog.closeAll();
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'No se pudieron guardar los datos del paciente!',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudieron guardar los datos del paciente!',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudieron guardar los datos del paciente!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  }
  editarCliente() {
    if (this.data) {
      if (this.data.estado) {
        this.cliente = this.data.paciente.mascota.cliente;
        this.mascota = this.data.paciente.mascota;
        this.paciente = this.data.paciente;
        this.cargarFormCliente();
        this.cargarFormMascota();
      }
    }
  }

  cargarFormCliente(): void {
    this.clienteForm.setValue({
      tipoId: this.cliente.tipoId,
      numId: this.cliente.numId,
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      direccion: this.cliente.direccion,
      ciudad: this.cliente.ciudad,
      telefono: this.cliente.telefono,
    });
  }
  cargarFormMascota(): void {
    this.mascotaForm.setValue({
      nomMascota: this.mascota.nomMascota,
      especieMascota: this.mascota.especieMascota,
      razaMascota: this.mascota.razaMascota,
      fecNacMascota: this.mascota.fecNacMascota,
      colorMascota: this.mascota.colorMascota,
    });
  }
}
