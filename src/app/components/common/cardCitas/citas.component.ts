import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Cita } from '../../../interfaces/cita';
import { CommonModule } from '@angular/common';
import { IHorarioDisponible } from '../../../interfaces/ihorario-disponible';
import { AuthService } from '../../../auth/services/auth.service';
import { CitasService } from '../../../services/citas-service.service';
import { CitaDetallada } from '../../../interfaces/citaDetallada';


@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  @Input() cita!: CitaDetallada;
  @Input() esMedico: boolean = false;
  @Output() eliminar = new EventEmitter<number>();

  citaDetallada?: CitaDetallada;
  horarios: IHorarioDisponible[] = [];
  
  constructor(
  
  ) {}
ngOnInit() {
  console.log('Cita recibida:', this.cita);
  console.log('esMedico:', this.esMedico);
}

  onEliminar() {
    this.eliminar.emit(this.cita.idCita);
  }

}
