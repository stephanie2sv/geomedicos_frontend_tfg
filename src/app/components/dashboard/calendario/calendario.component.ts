import { CommonModule } from "@angular/common";
import { Component, inject, NgModule, OnInit } from "@angular/core";
import {FullCalendarModule} from '@fullcalendar/angular'
import { CalendarOptions,EventInput } from "@fullcalendar/core/index.js";
import { CitasService } from "../../../services/citas-service.service";
import dayGridPlugin from '@fullcalendar/daygrid'
import { MatCard , MatCardContent} from "@angular/material/card";
import { AuthService } from "../../../auth/services/auth.service";
import { CitaDetallada } from "../../../interfaces/citaDetallada";


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

  private citasService: CitasService = inject(CitasService);
  private authService: AuthService = inject(AuthService);

   constructor(
   ) {}

   ngOnInit(): void {
    const user = this.authService.getCurrentUserValue();

    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    // Paciente
    if (user.role === 'PACIENTE') {
      this.citasService.getCitasPorUsuario(user.idUsuario).subscribe({
        next: (citas) => {
          console.log("citas: ",citas)
          this.calendarOptions.events = this.mapCitasToEvents(citas);
        },
        error: (err) => console.error('Error cargando citas del paciente', err)
      });
    }

    // Médico
    if (user.role === 'DOCTOR'&& 'colegiado' in user) {
      const fechaInicio = '2025-01-01';
      this.citasService.getCitasMedico(user.colegiado).subscribe({
        next: (citas) => {
          this.calendarOptions.events = this.mapCitasToEvents(citas);
        },
        error: (err) => console.error('Error cargando citas del médico', err)
      });
    }
  }

  private mapCitasToEvents(citas: CitaDetallada[]): any[] {
    const user = this.authService.getCurrentUserValue();
    if (!user) return [];

    return citas.map(cita => ({
      id: cita.idCita,
      title: user.role === 'DOCTOR'
        ? `Paciente: ${cita.nombrePaciente}`
        : `Médico: ${cita.nombreMedico}`,
      start: `${cita.fecha}T${cita.horaInicio}`,
      
    }));
  }
}

   


