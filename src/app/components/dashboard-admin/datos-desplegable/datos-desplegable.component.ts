import { Component, Input, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule,MatCardSubtitle,MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { DatosPersonalesService } from '../../../services/datos-personales.service';
import { IAdmin } from '../../../interfaces/iadmin';


@Component({
  selector: 'app-datos-desplegable',
  standalone: true,
  imports: [MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatIcon],
  templateUrl: './datos-desplegable.component.html',
  styleUrl: './datos-desplegable.component.css'
})
export class DatosDesplegableComponent implements OnInit {

@Input() correo!: string;
@Input() persona:IAdmin| null
mostrarAltaHorario: boolean = false;
mostrarListadoHorarios: boolean = false;


constructor(private datosPersonalesService:DatosPersonalesService){
this.persona=null;

}

ngOnInit(): void {
  if (this.persona) {
    console.log('Persona recibida en DatosDesplegableComponent:', this.persona);
  } else {
    console.error('Persona es null o undefined en DatosDesplegableComponent');
  }
}


}
