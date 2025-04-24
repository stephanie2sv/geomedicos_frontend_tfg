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
  templateUrl: './datos-desplegables.component.html',
  styleUrl: './datos-desplegables.component.css'
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
  return persona !== null && 'especialidades' in persona && 'tratamientos' in persona;
}

isUser(persona: IUser | IMedico | null): persona is IUser {
  return persona !== null && 'correo' in persona && 'role' in persona && 'id_usuario' in persona;
}
}
