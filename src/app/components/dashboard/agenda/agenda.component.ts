import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import interactionPlugin from '@fullcalendar/interaction'
import { MatCard } from '@angular/material/card';
import { CitasService } from '../../../services/citas-service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { IHorarioDisponible } from '../../../interfaces/ihorario-disponible';
import { MedicosService } from '../../../services/medicos.service';
import { CitaDetallada } from '../../../interfaces/citaDetallada';
import Swal from 'sweetalert2';
import { Clinica } from '../../../interfaces/clinica';
import { ClinicasService } from '../../../services/clinicas-service.service';


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
    select: this.onTimeSlotSelected.bind(this),
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
    clinicas: Clinica[] = [];
    clinicaSeleccionadaId: number | null = null;

    private citasService: CitasService = inject(CitasService);
    private authService: AuthService = inject(AuthService);
    private medicosService: MedicosService = inject(MedicosService);
    private clinicasService:ClinicasService=inject(ClinicasService);

  constructor( 
  ) {}
  
ngOnInit(): void {
    const user = this.authService.getCurrentUserValue();

    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }
    console.log("user: ",user)
    if ( user.role === 'DOCTOR' && 'colegiado' in user)  {
      console.log("Colegiado del médico:", user.colegiado);

      this.citasService.getCitasMedico(user.colegiado).subscribe({
        next: citas => this.calendarOptions.events = this.mapCitasToEvents(citas),
        error: err => console.error('Error cargando citas del médico', err)
      });

      this.clinicasService.getTodas().subscribe({
      next: clinicas => this.clinicas = clinicas,
      error: err => console.error('Error cargando clínicas', err)
  });
    } else if (user.role === 'PACIENTE'){
      this.citasService.getCitasPorUsuario(user.idUsuario).subscribe({
        next: citas => this.calendarOptions.events = this.mapCitasToEvents(citas),
        error: err => console.error('Error cargando citas del paciente', err)
      });
    }
  }

  
private mapCitasToEvents(citas: CitaDetallada[]): any[] {
const user = this.authService.getCurrentUserValue();
  
  if (!user) {
    console.error('Usuario no autenticado');
    return [];
  }

  return citas.map(cita => ({
    id: cita.idCita,
    title: user.role === 'DOCTOR'
      ? `Paciente: ${cita.nombrePaciente}`
      : `Médico: ${cita.nombreMedico}`,
    start: `${cita.fecha}T${cita.horaInicio}`,
    end: `${cita.fecha}T${this.addMinutes(cita.horaInicio, 30)}`,
    color: '#28a745'
  }));
  }
  

  private addMinutes(time: string, mins: number): string {
    const [h, m] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m + mins);
    return date.toTimeString().split(':').slice(0, 2).join(':');
  }

  onTimeSlotSelected(selectionInfo: any) {
  const user = this.authService.getCurrentUserValue();

  if (user?.role !== 'DOCTOR' || !('colegiado' in user)) {
    return;
  }

  const fecha = selectionInfo.startStr.split('T')[0]; 
  const hora = selectionInfo.startStr.split('T')[1].substring(0, 5); 
  const options = this.clinicas.map(c => `<option value="${c.idClinica}">${c.nombre}</option>`).join('');
  
  Swal.fire({
    title: '¿Crear horario disponible?',
     html: `
      <p>Fecha: <strong>${fecha}</strong></p>
      <p>Hora: <strong>${hora}</strong></p>
      <select id="clinicaSelect" class="swal2-select" style="width:100%;margin-top:10px">
        ${options}
      </select>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, crear',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const idClinica = (document.getElementById('clinicaSelect') as HTMLSelectElement).value;
      if (!idClinica) {
        Swal.showValidationMessage('Debes seleccionar una clínica');
        return;
      }
      return idClinica;
    }
  }).then(result => {
      if (result.isConfirmed) {
     
      const nuevaCita = {
        colegiado: user.colegiado,
        idClinica: +result.value,
        fechaCita: fecha,
        horaInicio: hora
      };
      const eventosActuales = Array.isArray(this.calendarOptions.events) 
           ? this.calendarOptions.events 
         : [];
      this.medicosService.altaHorarioMedico(nuevaCita).subscribe({
        next: () => {
          Swal.fire('Horario creado', '', 'success');
         this.calendarOptions.events = [
             ...eventosActuales,
             {
                title: 'Disponible',
                start: `${fecha}T${hora}`,
                end: `${fecha}T${this.addMinutes(hora, 30)}`
              }
            ];
          },
           error: () => Swal.fire('Error', 'No se pudo crear el horario', 'error')
          });
        }
      });
}

}
