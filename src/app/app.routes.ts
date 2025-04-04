import { Routes } from '@angular/router';
import { HomeComponent } from './User/pages/home/home.component';
import { AreaPersonalGeneralComponent } from './pages/area-personal-general/area-personal-general.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'areaPersonal/:role', component: AreaPersonalGeneralComponent},

];
