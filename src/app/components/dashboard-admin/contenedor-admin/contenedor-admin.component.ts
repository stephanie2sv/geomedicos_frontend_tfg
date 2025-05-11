import { Component, Input } from '@angular/core';
import { GestionUsuariosComponent } from "../gestion-usuarios/gestion-usuarios.component";
import { GestionClinicasComponent } from "../gestion-clinicas/gestion-clinicas.component";
import { GestionEspecialidadesComponent } from "../gestion-especialidades/gestion-especialidades.component";

@Component({
  selector: 'app-contenedor-admin',
  standalone: true,
  imports: [GestionUsuariosComponent, GestionClinicasComponent, GestionEspecialidadesComponent],
  templateUrl: './contenedor-admin.component.html',
  styleUrl: './contenedor-admin.component.css'
})
export class ContenedorAdminComponent {
  @Input() componente: string = '';
constructor(){
  console.log('ContenedorSeleccionado ha sido creado')
}
}
