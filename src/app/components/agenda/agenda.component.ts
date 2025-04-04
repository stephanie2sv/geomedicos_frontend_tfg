import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { CitasService } from '../../services/citas.service';
import interactionPlugin from '@fullcalendar/interaction'
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule,FullCalendarModule,MatCard],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit {

  calendarOptions:CalendarOptions={
    initialView:'timeGridWeek',
    plugins:[timeGridPlugin,dayGridPlugin,interactionPlugin],
    selectable:true,
    editable:true,
    headerToolbar:{
      left:'prev,next today',
      center:'title',
      right:'timeGridWeek,timeGridDay'
    },
    slotMinTime:"07:00:00",
    slotMaxTime:"20:00:00",
    allDaySlot:false,
    events:[]
  }

  constructor(private citasService:CitasService){}

  ngOnInit(){
    this.cargarEventos();
  }

  cargarEventos(){
    this.citasService.getCitas().subscribe(
      citas=>{
        const eventos = citas.map(cita=>({
          title: `Cita con ${cita.nombrePaciente}`,
          start: new Date(cita.fecha).toISOString(),
          allDay:false
        }));
        this.calendarOptions={...this.calendarOptions,events:eventos};
      },
      error=>console.error('Error al cargar citas:', error)
    )
  }
}
