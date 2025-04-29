import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IEspecialidad } from '../../../interfaces/iespecialidad';


@Component({
  selector: 'app-enfermedad-filtros',
  standalone:true,
  templateUrl: './enfermedad-filtros.component.html',
  styleUrls: ['./enfermedad-filtros.component.css']
})
export class EnfermedadFiltrosComponent {
  @Input() termino: string = '';
  @Input() sugerencias: string[] = [];
  @Input() especialidades: IEspecialidad[] = [];
  @Input() especialidadId: number = 0;

  @Output() onInputChange = new EventEmitter<string>();
  @Output() onBuscar = new EventEmitter<void>();
  @Output() onEspecialidadChange = new EventEmitter<number>();

  private inputSubject = new Subject<string>();

  constructor() {
    this.inputSubject.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.onInputChange.emit(value);
    });
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputSubject.next(target.value);
  }

  buscarManual(): void {
    this.onBuscar.emit();
  }

  cambiarEspecialidad(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.onEspecialidadChange.emit(Number(target.value));
  }
}
