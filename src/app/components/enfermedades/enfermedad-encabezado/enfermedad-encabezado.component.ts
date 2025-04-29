import { Component,  Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IEnfermedad } from '../../../interfaces/ienfermedad';

@Component({
  selector: 'app-enfermedad-encabezado',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './enfermedad-encabezado.component.html',
  styleUrl: './enfermedad-encabezado.component.css'
})
export class EnfermedadEncabezadoComponent {
  @Input() enfermedad: IEnfermedad | null = null;
}
