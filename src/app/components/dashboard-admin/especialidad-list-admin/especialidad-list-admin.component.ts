import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEspecialidad } from '../../../interfaces/iespecialidad';

@Component({
  selector: 'app-especialidad-list-admin',
  standalone: true,
  imports: [],
  templateUrl: './especialidad-list-admin.component.html',
  styleUrl: './especialidad-list-admin.component.css'
})
export class EspecialidadListAdminComponent {
  @Input() especialidades: IEspecialidad[] = [];
  @Output() eliminar = new EventEmitter<number>();

  eliminarEspecialidad(id: number): void {
    this.eliminar.emit(id);
  }
}
