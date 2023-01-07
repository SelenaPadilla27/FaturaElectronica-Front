import { Environments } from 'src/environments/environments';

export const Rutas = {
  //Controlador de autenticacion
  POST_AUTH_LOGIN: `${Environments.URLApi}api/login/`,

  //Controlador de Cliente
  GET_LISTA_CLIENTES: `${Environments.URLApi}api/cliente/`,
  DELETE_ELIMINAR_CLIENTE: `${Environments.URLApi}api/cliente/`,
  POST_REGISTRAR_CLIENTE: `${Environments.URLApi}api/cliente/agregarCliente`,
  GET_BUSCAR_CLIENTE: `${Environments.URLApi}api/cliente/obtenerPorId/`,
  POST_ACTUALIZAR_CLIENTE: `${Environments.URLApi}api/cliente/actualizarCliente/`,


  //Controlador de Mascota
  GET_LISTA_MASCOTAS: `${Environments.URLApi}api/mascota/`,
  DELETE_ELIMINAR_MASCOTA: `${Environments.URLApi}api/mascota/`,
  POST_REGISTRAR_MASCOTA: `${Environments.URLApi}api/mascota/agregarMascota/`,
  GET_BUSCAR_MASCOTA: `${Environments.URLApi}api/mascota/obtenerPorId/`,
  POST_ACTUALIZAR_MASCOTA: `${Environments.URLApi}api/mascota/actualizarMascota/`,


  //Controlador de Paciente
  GET_LISTA_PACIENTES: `${Environments.URLApi}api/paciente/`,
  DELETE_ELIMINAR_PACIENTE: `${Environments.URLApi}api/paciente/`,
  POST_REGISTRAR_PACIENTE: `${Environments.URLApi}api/paciente/agregarPaciente/`,
  GET_BUSCAR_PACIENTE: `${Environments.URLApi}api/paciente/obtenerPorId/`,
  POST_ACTUALIZAR_PACIENTE: `${Environments.URLApi}api/paciente/actualizarPaciente/`,
};
