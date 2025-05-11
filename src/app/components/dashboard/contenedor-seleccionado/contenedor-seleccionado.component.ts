import { Component, inject, Input, OnInit } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { AgendaComponent } from '../agenda/agenda.component';
import { CitasComponent } from '../../common/cardCitas/citas.component';
import { CitasService } from '../../../services/citas-service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CitaDetallada } from '../../../interfaces/citaDetallada';
import { IUser } from '../../../auth/interfaces/iuser';
import { IMedicoDto } from '../../../interfaces/imedico-dto';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contenedor-seleccionado',
  standalone: true,
  imports: [CalendarioComponent, AgendaComponent, CitasComponent],
  templateUrl: './contenedor-seleccionado.component.html',
  styleUrl: './contenedor-seleccionado.component.css'
})
export class ContenedorSeleccionadoComponent implements OnInit {
@Input() componente!: 'calendario' | 'agenda' | 'citas';
@Input() citas: CitaDetallada[]=[];
@Input() esMedico: boolean = false;
@Input() persona!: IUser | IMedicoDto | null;
@Input() role!:string|null;
private citasService:CitasService = inject(CitasService);
private authService:AuthService = inject(AuthService);



constructor(){
  console.log('ContenedorSeleccionado ha sido creado')
}

 ngOnInit(): void {
  if (!this.persona) {
    console.error('No se recibió la persona en contenedor-seleccionado');
    return;
  }
  
  const esMedico = this.persona.role === 'DOCTOR';

  if (esMedico && 'colegiado' in this.persona) {
    const colegiado = this.persona.colegiado;
    const hoy = new Date().toISOString().split('T')[0];

    this.citasService.getCitasMedico(this.persona.colegiado).subscribe({
      next: citas => this.citas = citas,
      error: err => console.error('Error cargando citas del médico', err)
    });
  } else if (this.persona.idUsuario) {
    this.citasService.getCitasPorUsuario(this.persona.idUsuario).subscribe({
      next: citas => this.citas = citas,
      error: err => console.error('Error cargando citas del paciente', err)
    });
  }
}

  onEliminar(idCita: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la cita permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.citasService.eliminarCita(idCita).subscribe({
        next: () => {
          this.citas = this.citas.filter(c => c.idCita !== idCita);
          Swal.fire({
            icon: 'success',
            title: 'Eliminada',
            text: 'La cita ha sido eliminada correctamente.'
          });
        },
        error: err => {
          console.error('Error eliminando cita', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la cita. Intenta más tarde.'
          });
        }
      });
    }
  });
}

}