import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-especialista-paginacion',
  standalone: true,
  imports: [],
  templateUrl: './especialista-paginacion.component.html',
  styleUrl: './especialista-paginacion.component.css'
})
export class EspecialistaPaginacionComponent {
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
