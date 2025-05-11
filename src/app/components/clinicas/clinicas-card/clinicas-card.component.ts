import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clinica } from '../../../interfaces/clinica';

@Component({
  selector: 'app-clinicas-card',
  standalone: true,
  imports: [],
  templateUrl: './clinicas-card.component.html',
  styleUrl: './clinicas-card.component.css'
})
export class ClinicasCardComponent {
@Input() clinica!:Clinica;
@Output() verDetalle = new EventEmitter<Clinica>();

    getNombresEspecialidades(clinica: Clinica): string {
      if (!clinica.especialidades) return '';
      return clinica.especialidades.map(e => e.nombre).join(', ');
    }


abrirDetalle() {
  this.verDetalle.emit(this.clinica);
}

}
