import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EspecialidadesService } from '../../services/especialidades.service';
import { ClinicasService } from '../../services/clinicas-service.service';
import { Clinica } from '../../interfaces/clinica';
import { ClinicasCardComponent } from "../../components/clinicas/clinicas-card/clinicas-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ClinicasCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  terminoBusqueda: string = '';
  provinciaSeleccionada: string = '';
  provincias: string[] = [];
  clinicasFiltradas: Clinica[] = [];
  clinicaSeleccionada: Clinica | null = null;
private router: Router = inject(Router);
private especialidadesService:EspecialidadesService = inject(EspecialidadesService);
private clinicasService: ClinicasService = inject(ClinicasService);
private route:ActivatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const termino = params['termino'];
      const provincia = params['provincia'];
  
      if (!termino && !provincia) {
        this.clinicasFiltradas = [];
        return;
      }
  
      if (termino && provincia) {
        forkJoin({
          especialidades: this.especialidadesService.getEspecialidadesPorNombre(termino),
          clinicas: this.clinicasService.getClinicasPorCiudad(provincia)
        }).subscribe(({ especialidades, clinicas }) => {
          const idsEspecialidades = especialidades.map(e => e.idEspecialidad);
          this.clinicasFiltradas = clinicas.filter(c =>
            c.especialidades?.some(e => idsEspecialidades.includes(e.idEspecialidad))
          );
        });
      } else if (termino) {
        // Solo especialidad
        this.especialidadesService.getEspecialidadesPorNombre(termino).subscribe(especialidades => {
          const ids = especialidades.map(e => e.idEspecialidad);
          // Suponiendo que puedes cargar todas las clínicas aquí
          this.clinicasService.getTodas().subscribe(clinicas => {
            this.clinicasFiltradas = clinicas.filter(c =>
              c.especialidades?.some(e => ids.includes(e.idEspecialidad))
            );
          });
        });
      } else if (provincia) {
        this.clinicasService.getClinicasPorCiudad(provincia).subscribe(clinicas => {
          this.clinicasFiltradas = clinicas;
        });
      }
    });

    this.terminoBusqueda = '';
    this.provinciaSeleccionada = '';

    this.clinicasService.getTodas().subscribe(clinicas => {
       const provinciasSet = new Set<string>();
       clinicas.forEach(clinica => {
          if (clinica.ciudad) provinciasSet.add(clinica.ciudad);
          });
        this.provincias = Array.from(provinciasSet).sort();
      });
  }

  buscar(): void {
    if (!this.terminoBusqueda && !this.provinciaSeleccionada) {
      alert("Por favor ingresa un término o selecciona una provincia");
      return;
    }
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        termino: this.terminoBusqueda,
        provincia: this.provinciaSeleccionada
      },
      queryParamsHandling: 'merge' 
    });
  }
  getNombresEspecialidades(clinica: Clinica): string {
    if (!clinica.especialidades) return '';
    return clinica.especialidades.map(e => e.nombre).join(', ');
  }

//modal para redirigir de clinicas a especialidades
  verDetalleClinica(clinica: Clinica): void {
  this.clinicaSeleccionada = clinica;
}

cerrarModalClinica(): void {
  this.clinicaSeleccionada = null;
}

irAEspecialidad(id: number): void {
  this.router.navigate(['/especialidades', id]);
  this.cerrarModalClinica();
}
}
