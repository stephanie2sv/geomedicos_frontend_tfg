import { Component, Input } from '@angular/core';
import { Icita } from '../../interfaces/icita';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [],
  templateUrl: './card-citas.component.html',
  styleUrl: './card-citas.component.css'
})
export class CitasComponent {
  @Input() cita!:Icita;

}