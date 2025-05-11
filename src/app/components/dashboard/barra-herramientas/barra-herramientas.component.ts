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

  @Output() componenteSeleccionado= new EventEmitter<'calendario' | 'agenda' | 'citas'>();
  @Output() mostrarDatos=new EventEmitter<string>();

  seleccionarComponente(componente:'calendario' | 'agenda' | 'citas'){
    this.componenteSeleccionado.emit(componente);
  }

  mostrarOcultarDatos(){
    this.mostrarDatos.emit();
  }
}