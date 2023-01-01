import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Login, Token } from 'src/app/models/login.models';
import { Rutas } from 'src/app/utils/rutas';
import { Observable } from 'rxjs';
import { Cliente, Mascota, Paciente } from '../models/mascota.models';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  constructor(private http: HttpClient) {}


//Mascota
  obtenerMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(Rutas.GET_LISTA_MASCOTAS);
  }

  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.DELETE_ELIMINAR_MASCOTA + id);
  }

  registrarMascota(id: number, mascota: Mascota): Observable<void> {
    return this.http.post<void>(Rutas.POST_REGISTRAR_MASCOTA + id, mascota);
  }

  obtenerMascotaPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(Rutas.GET_BUSCAR_MASCOTA + id);
  }

  //Cliente

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(Rutas.GET_LISTA_CLIENTES);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.DELETE_ELIMINAR_CLIENTE + id);
  }

  registrarCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(Rutas.POST_REGISTRAR_CLIENTE, cliente);
  }

  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(Rutas.GET_BUSCAR_CLIENTE + id);
  }

  //Paciente

  obtenerPacientes(): Observable<Paciente[]> {
    const headers = new HttpHeaders();
    const token=localStorage.getItem("token") ? localStorage.getItem("token"):'';
    headers.set('Authorization', `${token}`)
    return this.http.get<Paciente[]>(Rutas.GET_LISTA_PACIENTES);
  }

  eliminarPaciente(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.DELETE_ELIMINAR_PACIENTE + id);
  }

  registrarPaciente(id: number, paciente: Paciente): Observable<void> {
    return this.http.post<void>(Rutas.POST_REGISTRAR_PACIENTE + id, paciente);
  }

  obtenerPacientePorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(Rutas.GET_BUSCAR_PACIENTE + id);
  }

  actualizarPacientePorId(id:number, paciente: Paciente): Observable<void> {
    return this.http.post<void>(Rutas.POST_ACTUALIZAR_PACIENTE + id, paciente);
  }
}
