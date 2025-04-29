import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinicas-filtros',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './clinicas-filtros.component.html',
  styleUrl: './clinicas-filtros.component.css'
})
export class ClinicasFiltrosComponent {
  @Input() termino: string = '';
  @Output() onBuscar = new EventEmitter<string>();

  buscar() {
    this.onBuscar.emit(this.termino);
  }
}
