import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Clinica } from '../../../interfaces/clinica';
import { ClinicasService } from '../../../services/clinicas-service.service';
import { AltaClinicasComponent } from "../alta-clinicas/alta-clinicas.component";
import { ClinicasFiltrosComponent } from "../../clinicas/clinicas-filtros/clinicas-filtros.component";

@Component({
  selector: 'app-clinicas-list-admin',
  standalone: true,
  imports: [AltaClinicasComponent, ClinicasFiltrosComponent],
  templateUrl: './clinicas-list-admin.component.html',
  styleUrl: './clinicas-list-admin.component.css'
})
export class ClinicasListAdminComponent implements OnInit{
 clinicas: Clinica[] = [];
  mostrarAltaClinica: boolean = false;
  terminoBusqueda: string = '';
  clinicasFiltradas: Clinica[]=[];
  private clinicasService: ClinicasService = inject(ClinicasService);
  constructor() {}

  ngOnInit(): void {
    this.cargarClinicas();
  }

  cargarClinicas(): void {
    this.clinicasService.getTodas().subscribe({
       next: data => {
    this.clinicas = data;
    this.clinicasFiltradas = data;
    },
      error: () => Swal.fire('Error', 'No se pudieron cargar las clínicas', 'error')
    });
  }

  eliminarClinica(idClinica: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.clinicasService.eliminarClinica(idClinica).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La clínica ha sido eliminada', 'success');
            this.clinicas = this.clinicas.filter(c => c.idClinica !== idClinica);
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar la clínica', 'error')
        });
      }
    });
  }

  abrirModalAlta(): void {
    this.mostrarAltaClinica = true;
  }

  cerrarModalAlta(): void {
    this.mostrarAltaClinica = false;
  }

  recargarClinicas(): void {
    this.cargarClinicas();
  }

  
aplicarFiltro(termino: string) {
  this.terminoBusqueda = termino;

  // Aplica el filtro sobre la lista de clínicas
  this.clinicasFiltradas = this.clinicas.filter(c =>
    c.nombre.toLowerCase().includes(termino.toLowerCase())
  );
}
}
