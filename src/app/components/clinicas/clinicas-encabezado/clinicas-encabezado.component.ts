import { Component, Input } from '@angular/core';
import { Clinica } from '../../../interfaces/clinica';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clinicas-encabezado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clinicas-encabezado.component.html',
  styleUrl: './clinicas-encabezado.component.css'
})
export class ClinicasEncabezadoComponent {
@Input() clinica: Clinica | null = null;
}
