import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { IMedico } from '../../interfaces/imedico';
import { IAdmin } from '../../interfaces/iadmin';
import { DatosPersonalesService } from '../../services/datos-personales.service';
import { MatCardHeader, MatCardModule,MatCardSubtitle,MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-datos-desplegable',
  standalone: true,
  imports: [MatCardContent,MatCardHeader,MatCardModule,MatCardSubtitle,MatIcon],
  templateUrl: './datos-desplegable.component.html',
  styleUrl: './datos-desplegable.component.css'
})
export class DatosDesplegableComponent implements OnInit {

@Input() correo!: string;
@Input() persona:IUser | IMedico | null



constructor(private datosPersonalesService:DatosPersonalesService){
this.persona=null;

}

ngOnInit():void{
  if(this.persona){
    console.log(this.persona)
    
  }
}

isMedico(persona: IUser | IMedico | null): persona is IMedico {
  return (persona as IMedico)?.especialidad !== undefined && (persona as IMedico)?.tratamientos !== undefined;
}
}
