import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { EnfermedadesListComponent } from './public/enfermedades-list/enfermedades-list.component';
import { EspecialistaListComponent } from './public/especialista-list/especialista-list.component';
import { AreaPersonalAdminComponent } from './pages/Admin/pages/area-personal-admin/area-personal-admin.component';

import { Page404Component } from './public/page404/page404.component';

import { authGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guards';
import { RegisterComponent } from './auth/components/register/register.component';

import { DashboardComponent } from './pages/dashboard/contenedor-dashboard/contenedor-dashboard.component';
import { ClinicasListComponent } from './public/clinicas-list/clinicas-list.component';
import { PideCitaComponent } from './public/pide-cita/pide-cita.component';



export const routes: Routes = [

  // Rutas públicas
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'enfermedades', component: EnfermedadesListComponent },
  { path: 'especialidades', component: EspecialistaListComponent },
  { path: 'especialidades/:id', component: EspecialistaListComponent },
  { path: 'clinicas', component: ClinicasListComponent },
  { path: 'pide-cita', component: PideCitaComponent, canActivate: [authGuard, RoleGuard],
     data: { roles: ['PACIENTE', 'DOCTOR', 'ADMON'] } },
  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['PACIENTE', 'ADMON', 'DOCTOR'] } },


  
  // Ruta para acceso denegado
//   { path: 'unauthorized', component: UnauthorizedComponent },

  // Rutas por defecto
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];
