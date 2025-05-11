import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { IHorarioDisponible } from '../../interfaces/ihorario-disponible';
import { IMedicoCard } from '../../interfaces/MedicoCard';
import { IMedicoDto } from '../../interfaces/imedico-dto';

@Component({
  selector: 'app-medico-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './medico-card.component.html',
  styleUrl: './medico-card.component.css'
})
export class MedicoCardComponent {
@Input() medico!: IMedicoDto;
@Input() control!: FormControl;  

@Output() select = new EventEmitter<{ colegiado: string}>();

onClick() {
  this.select.emit({
    colegiado: this.medico.colegiado,
  
  });
}
}
