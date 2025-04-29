import { Component, EventEmitter, Output} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-herramientas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './barra-herramientas.component.html',
  styleUrl: './barra-herramientas.component.css'
})
export class BarraHerramientasComponent {

  @Output() componenteSeleccionado= new EventEmitter<string>();
  @Output() mostrarDatos=new EventEmitter<string>();

  seleccionarComponente(componente:string){
    this.componenteSeleccionado.emit(componente);
  }

  mostrarOcultarDatos(){
    this.mostrarDatos.emit();
  }
}