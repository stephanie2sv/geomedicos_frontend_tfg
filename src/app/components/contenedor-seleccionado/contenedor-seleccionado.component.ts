import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';


import { CitasService } from '../../services/citas-service.service';
;
import { MatCard } from '@angular/material/card';
import { Icita } from '../../interfaces/icita';
import { CitasComponent } from '../card-citas/card-citas.component';
import { AgendaComponent } from '../agenda/agenda.component';

@Component({
  selector: 'app-contenedor-seleccionado',
  standalone: true,
  imports: [CalendarioComponent, CitasComponent,AgendaComponent],
  templateUrl: './contenedor-seleccionado.component.html',
  styleUrl: './contenedor-seleccionado.component.css'
})
export class ContenedorSeleccionadoComponent implements OnInit, OnChanges {
@Input() componente:string='';
@Input() citas: Icita[]=[];

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
  this.citasService.getAllCitas().subscribe(
    (data)=>{
      this.citas=data;
    }
  )
}

}