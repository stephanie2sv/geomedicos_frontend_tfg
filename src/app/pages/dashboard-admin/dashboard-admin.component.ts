import { Component, inject, OnInit } from '@angular/core';
import { BarraHerramientasAdminComponent } from "../../components/dashboard-admin/barra-herramientas-admin/barra-herramientas-admin.component";
import { ContenedorAdminComponent } from "../../components/dashboard-admin/contenedor-admin/contenedor-admin.component";
import { DatosDesplegableComponent } from "../../components/dashboard-admin/datos-desplegable/datos-desplegable.component";
import { IAdmin } from '../../interfaces/iadmin';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [BarraHerramientasAdminComponent, ContenedorAdminComponent, DatosDesplegableComponent,CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {
  persona: IAdmin | null = null;
  componenteActual: string = '';
  mostrarDatos: boolean = false;

  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    const user = this.authService.getCurrentUserValue();
    if (this.isAdmin(user)) {
      this.persona = user;
  }
  }

  actualizarComponente(nombre: string): void {
    this.componenteActual = nombre;
  }

  toggleDatosDesplegable(): void {
    this.mostrarDatos = !this.mostrarDatos;
  }

  isAdmin(user: any): user is IAdmin {
  return user?.role === 'ADMON';
}
}
