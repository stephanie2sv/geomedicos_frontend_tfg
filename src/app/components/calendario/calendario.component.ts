import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import {FullCalendarModule} from '@fullcalendar/angular'
import { CalendarOptions,EventInput } from "@fullcalendar/core/index.js";
import { CitasService } from "../../services/citas.service";
import dayGridPlugin from '@fullcalendar/daygrid'
import { Cita } from "../../interfaces/cita";
import { MatCard , MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule,FullCalendarModule,MatCard,MatCardContent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit {

  calendarOptions:CalendarOptions={
    initialView:'dayGridMonth',
    plugins:[dayGridPlugin],
    selectable:true,
    editable:true,
    events:[]
  }

  
constructor(private citasService: CitasService){}

ngOnInit(){
  this.cargarEventos();
}

cargarEventos(){
  this.citasService.getCitas().subscribe((citas:Cita[])=>{
    console.log('Citas cargados:',citas);
    const eventos:EventInput[]=citas.map(cita=>({
      title:`Cita con ${cita.nombrePaciente}`,
      start: cita.fecha
    }));

    this.calendarOptions={
      ...this.calendarOptions,
      events:eventos
    };
  },
  error=>console.error('Error al cargar citas:',error)
);
}


}
