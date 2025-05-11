import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialidad-alta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './especialidad-alta.component.html',
  styleUrl: './especialidad-alta.component.css'
})
export class EspecialidadAltaComponent {
 @Output() especialidadCreada = new EventEmitter<string>();
  nombre: string = '';

  crear(): void {
    if (!this.nombre.trim()) return;
    this.especialidadCreada.emit(this.nombre.trim());
    this.nombre = '';
  }
}
