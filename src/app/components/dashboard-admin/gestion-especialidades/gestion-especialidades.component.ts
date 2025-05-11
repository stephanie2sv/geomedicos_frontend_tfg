import { Component, inject, OnInit } from '@angular/core';
import { IEspecialidad } from '../../../interfaces/iespecialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';
import Swal from 'sweetalert2';
import { EspecialidadAltaComponent } from "../especialidad-alta/especialidad-alta.component";
import { EspecialidadListAdminComponent } from "../especialidad-list-admin/especialidad-list-admin.component";

@Component({
  selector: 'app-gestion-especialidades',
  standalone: true,
  imports: [EspecialidadAltaComponent, EspecialidadListAdminComponent],
  templateUrl: './gestion-especialidades.component.html',
  styleUrl: './gestion-especialidades.component.css'
})
export class GestionEspecialidadesComponent implements OnInit {
especialidades: IEspecialidad[] = [];
private servicio: EspecialidadesService=inject(EspecialidadesService)
  constructor() {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.servicio.getEspecialidades().subscribe({
      next: data => this.especialidades = data
    });
  }

  crearEspecialidad(nombre: string): void {
    this.servicio.crearEspecialidad(nombre).subscribe({
      next: () => {
        this.cargarEspecialidades();
        Swal.fire('Creada', 'Especialidad añadida', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudo crear', 'error')
    });
  }

  eliminarEspecialidad(id: number): void {
    Swal.fire({
      title: '¿Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.servicio.eliminarEspecialidad(id).subscribe({
          next: () => {
            this.cargarEspecialidades();
            Swal.fire('Eliminada', '', 'success');
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}
