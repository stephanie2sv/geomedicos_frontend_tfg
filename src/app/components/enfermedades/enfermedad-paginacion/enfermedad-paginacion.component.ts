import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-enfermedad-paginacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enfermedad-paginacion.component.html',
  styleUrl: './enfermedad-paginacion.component.css'
})
export class EnfermedadPaginacionComponent {
  @Input() pagina: number = 1;
  @Input() totalPaginas: number = 1;
  @Output() onPaginaChange = new EventEmitter<number>();

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(p: number): void {
    if (p >= 1 && p <= this.totalPaginas) {
      this.onPaginaChange.emit(p);
    }
  }
}
