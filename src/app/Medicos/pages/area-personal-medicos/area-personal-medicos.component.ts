import { Component } from '@angular/core';
import { NavBarGeneralComponent } from "../../../components/nav-bar-general/nav-bar-general.component";
import { BarraHerramientasComponent } from "../../../components/barra-herramientas/barra-herramientas.component";
import { DatosDesplegableComponent } from "../../../components/datos-desplegable/datos-desplegable.component";
import { ContenedorSeleccionadoComponent } from "../../../components/contenedor-seleccionado/contenedor-seleccionado.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-personal-medicos',
  standalone: true,
  imports: [BarraHerramientasComponent, DatosDesplegableComponent, ContenedorSeleccionadoComponent,CommonModule],
  templateUrl: './area-personal-medicos.component.html',
  styleUrl: './area-personal-medicos.component.css'
})
export class AreaPersonalMedicosComponent {
[x: string]: any;

componenteActual:string;
mostrarDatos:boolean;

constructor(){
  this.componenteActual='calendario';
  this.mostrarDatos=false;
}

actualizarComponente(componente:string){
  this.componenteActual=componente;
}

toggleDatosDesplegable(){
  this.mostrarDatos=!this.mostrarDatos;
}


}
