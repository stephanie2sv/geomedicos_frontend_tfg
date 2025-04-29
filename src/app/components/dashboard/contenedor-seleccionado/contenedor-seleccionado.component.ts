import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { AgendaComponent } from '../agenda/agenda.component';
import { CitasComponent } from '../../common/cardCitas/citas.component';
import { Cita } from '../../../interfaces/cita';
import { CitasService } from '../../../services/citas-service.service';



@Component({
  selector: 'app-contenedor-seleccionado',
  standalone: true,
  imports: [CalendarioComponent, AgendaComponent, CitasComponent],
  templateUrl: './contenedor-seleccionado.component.html',
  styleUrl: './contenedor-seleccionado.component.css'
})
export class ContenedorSeleccionadoComponent implements OnInit, OnChanges {
@Input() componente:string='';
@Input() citas: Cita[]=[];
@Input() role: string | null = null;

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