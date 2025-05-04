import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { AgendaComponent } from '../agenda/agenda.component';
import { CitasComponent } from '../../common/cardCitas/citas.component';
import { Cita } from '../../../interfaces/cita';
import { CitasService } from '../../../services/citas-service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { IHorarioDisponible } from '../../../interfaces/ihorario-disponible';



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
@Input() esMedico: boolean = false;

@Output() eliminarCita = new EventEmitter<number>();

horarios: IHorarioDisponible[] = [];

constructor(private citasService:CitasService, private authService:AuthService){
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


cargarCitas(): void {
  const user = this.authService.getCurrentUserValue();
  if (!user) return;
    this.citasService.getCitasPorUsuario(user.idUsuario).subscribe({
      next: (res) => this.citas = res,
      error: (err) => console.error('Error al cargar citas de médico:', err)
    });
  }



  onEliminar(idCita: number) {
    this.citasService.eliminarCita(idCita).subscribe({
      next: () => {
        console.log('✅ Cita eliminada correctamente');
        this.cargarCitas(); // 🔁 Recargar la lista actualizada
      },
      error: err => console.error('❌ Error al eliminar cita:', err)
    });
  }

}