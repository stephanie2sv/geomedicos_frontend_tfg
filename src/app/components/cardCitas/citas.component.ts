import { Component, Input } from '@angular/core';
import { Cita } from '../../interfaces/cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  @Input() cita!:Cita;

}
