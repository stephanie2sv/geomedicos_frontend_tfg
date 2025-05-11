import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-filtros-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtros-usuarios.component.html',
  styleUrl: './filtros-usuarios.component.css'
})
export class FiltrosUsuariosComponent {
 correo: string = '';
 rolSeleccionado: string = '';

@Output() filtrosActualizados = new EventEmitter<{ correo: string; rol: string }>();


emitirBusqueda(): void {
  const correoTrimmed = this.correo.trim();

  this.filtrosActualizados.emit({
    correo: correoTrimmed,
    rol: this.rolSeleccionado
  });

  
  if (!correoTrimmed && !this.rolSeleccionado) {
    this.filtrosActualizados.emit({ correo: '', rol: '' });
  }
}
}
