import { Component, Input, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule,MatCardSubtitle,MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { IUser } from '../../../auth/interfaces/iuser';
import { DatosPersonalesService } from '../../../services/datos-personales.service';
import { IMedicoCard } from '../../../interfaces/MedicoCard';
import { IMedicoDto } from '../../../interfaces/imedico-dto';


@Component({
  selector: 'app-datos-desplegable',
  standalone: true,
  imports: [MatCardContent,MatCardHeader,MatCardModule,MatCardSubtitle,MatIcon],
  templateUrl: './datos-desplegable.component.html',
  styleUrl: './datos-desplegable.component.css'
})
export class DatosDesplegableComponent implements OnInit {

@Input() correo!: string;
@Input() persona:IUser | IMedicoDto | null



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

isMedico(persona: IUser | IMedicoDto | null): persona is IMedicoDto {
  return (persona as IMedicoDto)?.especialidades !== undefined && (persona as IMedicoDto)?.tratamientos !== undefined;
}
}
