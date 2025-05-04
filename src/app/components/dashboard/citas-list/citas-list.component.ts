import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cita } from '../../../interfaces/cita';
import { CommonModule } from '@angular/common';
import { CitasComponent } from "../../common/cardCitas/citas.component";


@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule, CitasComponent],
  templateUrl: './citas-list.component.html',
  styleUrl: './citas-list.component.css'
})
export class CitasListComponent {
  @Input() citas: Cita[] = [];
  @Input() esMedico: boolean = false;

  @Output() eliminarCita = new EventEmitter<number>();

  onEliminar(idCita: number) {
    this.eliminarCita.emit(idCita);
  }
}
