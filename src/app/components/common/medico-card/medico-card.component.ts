import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IMedicoCard } from '../../../interfaces/MedicoCard';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medico-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './medico-card.component.html',
  styleUrl: './medico-card.component.css'
})
export class MedicoCardComponent implements OnInit {
  @Input() medico!: IMedicoCard;

  @Output() verDetalle = new EventEmitter<IMedicoCard>();
  @Output() solicitarCita = new EventEmitter<IMedicoCard>();

  private authService:AuthService=inject(AuthService);

  estrellas: number[] = [1, 2, 3, 4, 5];
  estaLogueado: boolean = false;

  ngOnInit() {
     this.estaLogueado = this.authService.isAuthenticated() 
    console.log(' Card médico cargado:', this.medico);
    console.log(' Especialidades:', this.medico.especialidades);
  }

  onDetalle() {
    this.verDetalle.emit(this.medico);
  }

  onSolicitar() {
   if (!this.estaLogueado) {
      Swal.fire('Debes iniciar sesión para solicitar una cita', '', 'info');
      return;
    }

    this.solicitarCita.emit(this.medico);
  }
  

  obtenerNombreEspecialidad(especialidad: any): string {
    if (typeof especialidad === 'string') {
      return especialidad;
    }
    if (especialidad && typeof especialidad === 'object' && 'nombre' in especialidad) {
      return especialidad.nombre;
    }
    return 'Desconocida';
  }
}
