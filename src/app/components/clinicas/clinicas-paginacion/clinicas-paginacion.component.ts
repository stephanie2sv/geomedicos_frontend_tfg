import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clinicas-paginacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinicas-paginacion.component.html',
  styleUrl: './clinicas-paginacion.component.css'
})
export class ClinicasPaginacionComponent {

  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;
  @Output() onPaginaChange = new EventEmitter<number>();

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.onPaginaChange.emit(nuevaPagina);
    }
  }

}
