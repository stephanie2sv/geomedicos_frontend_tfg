import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMedicoCard } from '../../interfaces/MedicoCard';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-especialista-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './especialista-detalle.component.html',
  styleUrl: './especialista-detalle.component.css'
})
export class EspecialistaDetalleComponent {
  @Input() medico!: IMedicoCard;
  @Output() cerrar = new EventEmitter<void>();
  @Output() solicitarCita = new EventEmitter<IMedicoCard>();
  
  estaLogueado = false;

 private authService: AuthService= inject(AuthService);

  ngOnInit(): void {
    this.estaLogueado = this.authService.isAuthenticated() 
  }


  onCerrar() {
    this.cerrar.emit();
  }

  onSolicitarCita() {
    if (this.estaLogueado) {
      this.solicitarCita.emit(this.medico);
    }
  }


}

