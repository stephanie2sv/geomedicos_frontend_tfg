import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-barra-herramientas-admin',
  standalone: true,
  imports: [],
  templateUrl: './barra-herramientas-admin.component.html',
  styleUrl: './barra-herramientas-admin.component.css'
})
export class BarraHerramientasAdminComponent {

  @Output() componenteSeleccionado= new EventEmitter<'usuarios' | 'clinicas' | 'especialidades'>();
  @Output() mostrarDatos=new EventEmitter<string>();

  seleccionarComponente(componente:'usuarios' | 'clinicas' | 'especialidades'){
    this.componenteSeleccionado.emit(componente);
  }

  mostrarOcultarDatos(){
    this.mostrarDatos.emit();
  }
}
