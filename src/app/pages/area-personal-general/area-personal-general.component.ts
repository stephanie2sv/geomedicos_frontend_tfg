import { Component, OnInit } from '@angular/core';
import { BarraHerramientasComponent } from '../../components/barra-herramientas/barra-herramientas.component';
import { DatosDesplegableComponent } from '../../components/datos-desplegable/datos-desplegable.component';
import { ContenedorSeleccionadoComponent } from '../../components/contenedor-seleccionado/contenedor-seleccionado.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockApiService } from '../../services/mock-api.service';
import { IMedico } from '../../interfaces/imedico';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-area-personal-general',
  standalone: true,
  imports: [BarraHerramientasComponent, DatosDesplegableComponent, ContenedorSeleccionadoComponent,CommonModule],
  templateUrl: './area-personal-general.component.html',
  styleUrl: './area-personal-general.component.css'
})
export class AreaPersonalGeneralComponent implements OnInit{
  role:string;
  componenteActual:string;
  mostrarDatos:boolean;
  persona: IUser|IMedico|null = null;


  constructor(private route:ActivatedRoute,private mockApi:MockApiService){
    this.componenteActual='calendario';
    this.mostrarDatos=false;
    this.role='';

  }


  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.role=params['role'];

      if (this.role === 'user'){
        this.persona =this.mockApi.getUserByEmail('juan@example.com');
      }else if(this.role === 'doctor'){
        this.persona=this.mockApi.getDoctorByEmail('laura@example.com')
      }
    })
  }
  actualizarComponente(componente:string){
    this.componenteActual=componente;
  }
  
  toggleDatosDesplegable(){
    this.mostrarDatos=!this.mostrarDatos;
  }
}
