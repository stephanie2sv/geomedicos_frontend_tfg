import { AreaPersonalAdminComponent } from './pages/Admin/pages/area-personal-admin/area-personal-admin.component';
import { RegisterComponent } from './public/register/register.component';
import { LoginComponent } from './public/login/login.component';
import { EnfermedadesListComponent } from './public/enfermedades-list/enfermedades-list.component';
import { AreaPersonalMedicosComponent } from './pages/Medicos/pages/area-personal-medicos/area-personal-medicos.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { Page404Component } from './public/page404/page404.component';
import { authGuard } from './seguridad/guards/auth.guard';
import { roleGuard } from './seguridad/role-guard';
import { EspecialistaListComponent } from './public/especialista-list/especialista-list.component';
import { ClinicasComponent } from './public/clinicas/clinicas.component';



export const routes: Routes = [


    //rutas publicas
    {path: 'home', component: HomeComponent, canActivate: [authGuard]}, //authguard bloquea el acceso a rutas públicas si el usuario está autenticado, Redirige a cada tipo de usuario a su área correspondiente, Se aplica a: login, register y otras rutas públicas
    {path: 'enfermedades', component: EnfermedadesListComponent, canActivate: [authGuard]},
    {path: 'lista-especialistas', component: EspecialistaListComponent, canActivate: [authGuard]},
    {path: 'login', component:LoginComponent, canActivate: [authGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [authGuard]},
    {path: 'especialidades', component: EspecialistaListComponent},
    {path: 'especialidades/:id', component: EspecialistaListComponent},
    {path: 'clinicas', component: ClinicasComponent},


    // rutas de usuario
    {path: 'usario/areapersonal', component: AreaPersonalMedicosComponent, canActivate: [roleGuard], data: {expectedRole: 'PACIENTE'} }, //roleguard: Protege rutas privadas verificando el rol del usuario , Usa la propiedad data en las rutas para definir el rol requerido, Si el rol no coincide, redirige a una página 404
    //rutas de medicos
    {path: 'medico/areapersonal', component: AreaPersonalMedicosComponent, canActivate: [roleGuard], data: {expectedrole: 'DOCTOR'}},
    //rutas de administrador
    {path: 'admin/areapersonal', component: AreaPersonalAdminComponent, canActivate: [roleGuard], data: {expectedRole: 'ADMON'}},
    //rutas enfermedades
    //{path: 'enfermedades', component: EnfermedadesListComponent},


    //rutas por defecto 
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', component: Page404Component}
];
