import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { CitasComponent } from "../cardCitas/citas.component";
import { Cita } from '../../interfaces/cita';
import { CitasService } from '../../services/citas.service';
import { AgendaComponent } from '../agenda/agenda.component';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-contenedor-seleccionado',
  standalone: true,
  imports: [CalendarioComponent, CitasComponent,AgendaComponent],
  templateUrl: './contenedor-seleccionado.component.html',
  styleUrl: './contenedor-seleccionado.component.css'
})
export class ContenedorSeleccionadoComponent implements OnInit, OnChanges {
@Input() componente:string='';
@Input() citas: Cita[]=[];

constructor(private citasService:CitasService){
  console.log('ContenedorSeleccionado ha sido creado')
}

ngOnInit(){
  console.log('ngOnInit ejecutando');
  }


ngOnChanges(changes: SimpleChanges) {
  if (changes['componente'] && changes['componente'].currentValue === 'citas') {
    console.log('✅ Se ha cambiado a "citas", cargando citas...');
    this.cargarCitas();
  }
}


cargarCitas(){
  this.citasService.getCitas().subscribe(
    (data)=>{
      this.citas=data;
    }
  )
}

}
