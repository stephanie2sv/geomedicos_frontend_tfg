import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../../auth/interfaces/iuser';
import { UsuarioServiceService } from '../../../services/usuario-service.service';
import { FiltrosUsuariosComponent } from '../filtros-usuarios/filtros-usuarios.component';
import Swal from 'sweetalert2';
import { UsuariosListComponent } from "../usuarios-list/usuarios-list.component";

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [FiltrosUsuariosComponent, UsuariosListComponent],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: IUser[]=[];
  correoFiltro: string = '';
  rolFiltro: string = '';
private usuarioService:UsuarioServiceService=inject(UsuarioServiceService);

ngOnInit(): void {
  this.cargarUsuarios();
}

aplicarFiltros(filtros: { correo: string; rol: string }) {
  this.correoFiltro = filtros.correo;
  this.rolFiltro = filtros.rol;
  this.cargarUsuarios(); // Aplica ambos filtros
}

cargarUsuarios(): void {
  this.usuarioService.getTodosUsuarios().subscribe({
    next: (usuarios) => {
      this.usuarios = usuarios.filter(u =>
        (this.correoFiltro ? u.correo.includes(this.correoFiltro) : true) &&
        (this.rolFiltro ? u.role === this.rolFiltro : true)
      );
    },
    error: () => {
      Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
    }
  });
}

cambiarEstadoUsuario(usuario: IUser): void {
  const nuevoEstado = usuario.enabled === 1 ? 0 : 1;

  this.usuarioService.cambiarEstadoUsuario(usuario.idUsuario, nuevoEstado).subscribe({
    next: () => {
      usuario.enabled = nuevoEstado; 
      Swal.fire('Estado actualizado', `Usuario ${nuevoEstado ? 'activado' : 'desactivado'}`, 'success');
    },
    error:err => {
      console.error('Error al cambiar estado:', err);
      Swal.fire('Error', 'No se pudo actualizar el estado del usuario', 'error');
    }
  });
}
}
