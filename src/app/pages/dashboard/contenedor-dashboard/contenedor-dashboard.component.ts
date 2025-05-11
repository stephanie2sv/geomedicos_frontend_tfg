import { Component, OnInit, output, Output } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { BarraHerramientasComponent } from "../../../components/dashboard/barra-herramientas/barra-herramientas.component";
import { CommonModule } from '@angular/common';
import { DatosDesplegableComponent } from '../../../components/dashboard/datos-desplegable/datos-desplegable.component';
import { ContenedorSeleccionadoComponent } from '../../../components/dashboard/contenedor-seleccionado/contenedor-seleccionado.component';
import { IUser } from '../../../auth/interfaces/iuser';
import { IMedicoDto } from '../../../interfaces/imedico-dto';

@Component({
  selector: 'app-contenedor-dashboard',
  templateUrl: './contenedor-dashboard.component.html',
  standalone: true,
  styleUrls: ['./contenedor-dashboard.component.scss'],
  imports: [BarraHerramientasComponent, DatosDesplegableComponent, ContenedorSeleccionadoComponent, CommonModule]
})
export class DashboardComponent implements OnInit {
 role: string | null = null;
 persona: IUser | IMedicoDto | null = null;
 componenteActual: 'calendario' | 'agenda' | 'citas' = 'calendario';
  mostrarDatos = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.persona = user;
      console.log('Usuario cargado en Dashboard:', this.persona);
    });
  }
  actualizarComponente(nombre: 'calendario' | 'agenda' | 'citas') {
    this.componenteActual = nombre;
  }

  toggleDatosDesplegable() {
    this.mostrarDatos = !this.mostrarDatos;
  }
}
