import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialista-filtros',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './especialista-filtros.component.html',
  styleUrl: './especialista-filtros.component.css'
})
export class EspecialistaFiltrosComponent {
  @Input() termino: string = '';
  @Input() orden: string = 'nombre';

  @Output() onBuscar = new EventEmitter<string>();
  @Output() onOrdenar = new EventEmitter<string>();

  emitirBusqueda() {
    console.log('🟡 Emitiendo término desde filtros:', this.termino);
    this.onBuscar.emit(this.termino);
  }
  
  emitirOrden() {
    this.onOrdenar.emit(this.orden);
  }


  
}
