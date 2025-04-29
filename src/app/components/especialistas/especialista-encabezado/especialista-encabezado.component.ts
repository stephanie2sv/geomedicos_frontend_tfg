import { Component,  Input} from '@angular/core';
import { IEspecialidad } from '../../../interfaces/iespecialidad';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-especialista-encabezado',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './especialista-encabezado.component.html',
  styleUrl: './especialista-encabezado.component.css'
})
export class EspecialistaEncabezadoComponent {
  @Input() especialidad: IEspecialidad | null = null;
}
