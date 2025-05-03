import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import {FullCalendarModule} from '@fullcalendar/angular'
import { CalendarOptions,EventInput } from "@fullcalendar/core/index.js";
import { CitasService } from "../../../services/citas-service.service";
import dayGridPlugin from '@fullcalendar/daygrid'
import { MatCard , MatCardContent} from "@angular/material/card";
import { Cita } from "../../../interfaces/cita";
import { IHorarioDisponible } from "../../../interfaces/ihorario-disponible";
import { HorariosMedicosService } from "../../../services/horarios-medicos.service";
import { AuthService } from "../../../auth/services/auth.service";


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