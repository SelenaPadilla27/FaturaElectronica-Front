export interface Mascota {
  id: number;
  nomMascota: string;
  especieMascota: string;
  razaMascota: string;
  fecNacMascota: Date;
  colorMascota: string;
  cliente: Cliente;

}

export interface Cliente {
  id: number;
  tipoId: string;
  numId: string;
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  telefono: string;
}

export interface Paciente {
  id:number;
  fecRegistro:Date;
  mascota: Mascota;
}

