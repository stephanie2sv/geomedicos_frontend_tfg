import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEnfermedad } from '../../../interfaces/ienfermedad';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-enfermedad-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enfermedad-card.component.html',
  styleUrl: './enfermedad-card.component.css'
})
export class EnfermedadCardComponent {
  @Input() enfermedad!: IEnfermedad;
  @Output() onDetalle = new EventEmitter<IEnfermedad>();
}
