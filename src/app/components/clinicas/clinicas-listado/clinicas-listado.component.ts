import { Component, Input } from '@angular/core';
import { Clinica } from '../../../interfaces/clinica';

@Component({
  selector: 'app-clinicas-listado',
  standalone: true,
  imports: [],
  templateUrl: './clinicas-listado.component.html',
  styleUrl: './clinicas-listado.component.css'
})
export class ClinicasListadoComponent {
  @Input() clinicas: Clinica[] = [];
}
