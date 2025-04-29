import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-especialista-paginacion',
  standalone: true,
  imports: [],
  templateUrl: './especialista-paginacion.component.html',
  styleUrl: './especialista-paginacion.component.css'
})
export class EspecialistaPaginacionComponent {
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;
  @Output() cambiarPagina = new EventEmitter<number>();

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiar(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas && pagina !== this.paginaActual) {
      this.cambiarPagina.emit(pagina);
    }
  }
}
