import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import interactionPlugin from '@fullcalendar/interaction'
import { MatCard } from '@angular/material/card';
import { CitasService } from '../../../services/citas-service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { HorariosMedicosService } from '../../../services/horarios-medicos.service';
import { IHorarioDisponible } from '../../../interfaces/ihorario-disponible';


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
  constructor(
    private citasService: CitasService,
    private authService: AuthService,
    private horarioMedicoService: HorariosMedicosService 
  ) {}
  
  horarios: IHorarioDisponible[] = [];
  ngOnInit() {
    this.horarioMedicoService.getTodosLosHorarios().subscribe({
      next: horarios => {
        this.horarios = horarios;
        this.cargarEventos(); 
      },
      error: err => console.error('Error cargando horarios:', err)
    });
  }
  
  cargarEventos() {
    const user = this.authService.getCurrentUserValue();
    if (!user) return;

    this.citasService.getCitasPorUsuario(user.idUsuario).subscribe(
      citas => {
        const eventos = citas.map(cita => {
          const horario = this.horarios.find(h => h.idHorario === cita.idHorario);
          const hora = horario?.horaInicio || '10:00:00'; 
        
          return {
            title: user.role === 'PACIENTE'
              ? `Cita médica`
              : `Cita con ${cita.nombrePaciente || 'Paciente'}`,
            start: `${cita.fecha}T${hora}`,
            allDay: false
          };
        });
        
      this.calendarOptions = { ...this.calendarOptions, events: eventos };
    },
    error => console.error('Error al cargar citas:', error)
  );
    }

  
}