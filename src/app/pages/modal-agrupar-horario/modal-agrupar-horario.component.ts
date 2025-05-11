import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IMedicoDto } from '../../interfaces/imedico-dto';
import { IHorarioDisponible } from '../../interfaces/ihorario-disponible';
import { MedicosService } from '../../services/medicos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClinicasService } from '../../services/clinicas-service.service';
import { Clinica } from '../../interfaces/clinica';
import { IHorarioAltaDto } from '../../interfaces/ihorario-alta-dto';

@Component({
  selector: 'app-modal-agrupar-horario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modal-agrupar-horario.component.html',
  styleUrl: './modal-agrupar-horario.component.css'
})
export class ModalAgruparHorarioComponent implements OnInit{
@Input() medico!: IMedicoDto;
@Output() cerrar = new EventEmitter<void>();

  horariosAgrupados: { [fecha: string]: IHorarioAltaDto[] } = {};
  fechaInicioStr: string = new Date().toISOString().split('T')[0]; 
  clinicas: Clinica[] = [];

  private medicosService:MedicosService=inject(MedicosService);
  private clinicasService:ClinicasService=inject(ClinicasService);
  constructor() {}

ngOnInit(): void {
  console.log('👨‍⚕️ Medico recibido:', this.medico);
  this.clinicasService.getTodas().subscribe(clinicas => {
    this.clinicas = clinicas;
    this.recargarHorarios(); 
  });
}

  get fechasOrdenadas(): string[] {
    return Object.keys(this.horariosAgrupados).sort();
  }

  recargarHorarios(): void {
    const fecha = this.fechaInicioStr;
    const colegiado = this.medico.colegiado;

    this.medicosService.getHorariosDisponiblesAlta(colegiado, fecha).subscribe({
      next: horarios => {
        this.horariosAgrupados = this.agruparPorFecha(horarios);
        console.log('Fechas agrupadas:', this.horariosAgrupados);
      },
      error: () => {
        this.horariosAgrupados = {};
      }
    });
  }

  agruparPorFecha(horarios: IHorarioAltaDto[]): { [fecha: string]: IHorarioAltaDto[] } {
    return horarios.reduce((acc, horario) => {
      const fecha = horario.fechaCita;
      if (!acc[fecha]) acc[fecha] = [];
      acc[fecha].push(horario);
      return acc;
    }, {} as { [fecha: string]: IHorarioAltaDto[] });
  }

  getFechasAgrupadas(): string[] {
  return Object.keys(this.horariosAgrupados || {});
}

getNombreClinica(id: number): string {
  const clinica = this.clinicas.find(c => c.idClinica === id);
  return clinica?.nombre ?? 'Clínica no encontrada';
}

}
