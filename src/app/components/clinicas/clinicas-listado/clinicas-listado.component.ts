import { Component, inject, Input } from '@angular/core';
import { Clinica } from '../../../interfaces/clinica';
import { ClinicasCardComponent } from "../clinicas-card/clinicas-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinicas-listado',
  standalone: true,
  imports: [ClinicasCardComponent],
  templateUrl: './clinicas-listado.component.html',
  styleUrl: './clinicas-listado.component.css'
})
export class ClinicasListadoComponent {
  @Input() clinicas: Clinica[] = [];
clinicaSeleccionada: Clinica | null = null;
private router: Router = inject(Router);
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
