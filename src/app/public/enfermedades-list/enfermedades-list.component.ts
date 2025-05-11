import { EnfermedadesService } from './../../services/enfermedades.service';
import { Component, OnInit } from '@angular/core';
import { IEnfermedad } from '../../interfaces/ienfermedad';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnfermedadesDetalleComponent } from '../enfermedades-detalle/enfermedades-detalle.component';
import { IEspecialidad } from '../../interfaces/iespecialidad';
import { debounce, debounceTime, distinct, distinctUntilChanged, Subject } from 'rxjs';
import { EspecialidadesService } from '../../services/especialidades.service';
import { EnfermedadFiltrosComponent } from "../../components/enfermedades/enfermedad-filtros/enfermedad-filtros.component";
import { CargandoSpinnerComponent } from "../../components/shared/cargando-spinner/cargando-spinner.component";
import { EnfermedadCardComponent } from "../../components/enfermedades/enfermedad-card/enfermedad-card.component";
import { EnfermedadPaginacionComponent } from "../../components/enfermedades/enfermedad-paginacion/enfermedad-paginacion.component";
import { EnfermedadEncabezadoComponent } from "../../components/enfermedades/enfermedad-encabezado/enfermedad-encabezado.component";

@Component({
  selector: 'app-enfermedades-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EnfermedadesDetalleComponent, EnfermedadFiltrosComponent, CargandoSpinnerComponent, EnfermedadCardComponent, EnfermedadPaginacionComponent, EnfermedadEncabezadoComponent],
  templateUrl: './enfermedades-list.component.html',
  styleUrl: './enfermedades-list.component.css'
})
export class EnfermedadesListComponent implements OnInit {
//Datos principalez  
enfermedades: IEnfermedad[] = [];
enfermedadesFiltradas: IEnfermedad[] = [];
enfermedadesPaginadas: IEnfermedad[] = [];
especialidades: IEspecialidad[] = [];

//filtros
terminoBusqueda: string = '';
especialidadSeleccionada: number = 0; // 0 significa todas
sugerenciasBusqueda: string[] = [];
private searchTerms = new Subject<string>();

//Paginacion
paginaActual: number = 1;
elementosPorPagina: number = 6;
totalPaginas: number = 0;
numeroPaginas: number[] = [];

//Estado del componente
enfermedadSeleccionada: IEnfermedad | null = null;
cargando: boolean = true;
error: string | null = null;


constructor (private eservice: EnfermedadesService, private espeservice: EspecialidadesService, private router: Router) {}

ngOnInit(): void {
  this.cargarDatos();

this.searchTerms.pipe(
  debounceTime(300),
  distinctUntilChanged()
  ).subscribe(()=> {
    this.buscarEnfermedades();
  });
}

cargarDatos(): void {
  this.cargando = true;

  this.espeservice.getEspecialidades().subscribe({
    next: (data) => {
      this.especialidades = data;
    },
    error: (err) => {
      console.error('Error obteniendo especialidades:',err);
    }
  });

  this.eservice.getEnfermedades().subscribe({
    next: (data) => {
      this.enfermedades = data;
      this.enfermedadesFiltradas = data;
      this.actualizarPaginacion();
      this.prepararSugerencias();
      this.cargando = false;
    },
    error: (err) => {
      this.error = 'Error al cargar las enfermedades. Intente nuevamente más tarde';
      this.cargando = false;
      console.error('Error obteniendo enfermedades', err);
    }
  });
}


onSearchChange(): void {
  this.searchTerms.next(this.terminoBusqueda);
}


buscarEnfermedades(): void {
  this.cargando = true;
  this.paginaActual = 1;

  if (this.terminoBusqueda.trim() === '' && this.especialidadSeleccionada === 0) {
    //Sin filtros, cargar todas
    this.eservice.getEnfermedades().subscribe({
      next: (data) => {
        this.enfermedadesFiltradas = data;
        this.actualizarPaginacion();
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al filtrar enfermedades.';
        this.cargando = false;
        console.error('Error', err);
      }
    });
  } else if (this.terminoBusqueda.trim() !== '' && this.especialidadSeleccionada === 0) {
   
    this.eservice.buscarEnfermedades(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.enfermedadesFiltradas = data;
        this.actualizarPaginacion();
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al buscar enfermedades.';
        this.cargando = false;
        console.error('Error', err);
      }
    });
  } else if (this.terminoBusqueda.trim() === '' && this.especialidadSeleccionada !== 0) {
    
    this.eservice.getEnfermedadesPorEspecialidad(this.especialidadSeleccionada).subscribe({
      next: (data) => {
        this.enfermedadesFiltradas = data;
        this.actualizarPaginacion();
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al filtrar por especialidad.';
        this.cargando = false;
        console.error('Error:',err)
      }
    });
  } else {
    
    this.eservice.buscarEnfermedades(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.enfermedadesFiltradas = data.filter(e => e.idEspecialidad === this.especialidadSeleccionada);
        this.actualizarPaginacion();
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al filtrar enfermedades.';
        this.cargando = false;
        console.error('Error:',err);
      }
    });
  }
}

filtrarPorEspecialidad(): void {
  this.paginaActual = 1;
  this.buscarEnfermedades();
}

prepararSugerencias(): void {
  //Extraer nombres unidcos para el autocompletado
  this.sugerenciasBusqueda = Array.from(
    new Set(this.enfermedades.map(e => e.nombre))
  );
}

//Metodosx de paginacion
actualizarPaginacion(): void {
  console.log('Filtradas:', this.enfermedadesFiltradas.length);
console.log('Elementos por página:', this.elementosPorPagina);
  this.totalPaginas = Math.ceil(this.enfermedadesFiltradas.length / this.elementosPorPagina);
  this.numeroPaginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

  // Mantén la página actual si está dentro del nuevo rango
  if (this.paginaActual > this.totalPaginas) {
    this.paginaActual = this.totalPaginas;
  }
  if (this.paginaActual < 1) {
    this.paginaActual = 1;
  }

  this.cambiarPagina(this.paginaActual);
}

cambiarPagina(pagina: number): void{
  if (pagina < 1 || pagina > this.totalPaginas) {
    return;
  }

  this.paginaActual = pagina;
  const inicio = (pagina - 1) * this.elementosPorPagina;
  const fin = inicio + this.elementosPorPagina;
  this.enfermedadesPaginadas = this.enfermedadesFiltradas.slice(inicio, fin);
}

//metodos de detalle
verDetalle(enfermedad: IEnfermedad): void {
  this.enfermedadSeleccionada = enfermedad;
}

cerrarDetalle(): void {
  this.enfermedadSeleccionada = null;
}


buscarDoctoresPorEnfermedad(enfermedad: IEnfermedad): void {
  const idEspecialidad = enfermedad.idEspecialidad;

  if (idEspecialidad) {
    // Redirigir a la ruta de especialistas con ID
    this.router.navigate(['/medico/especialidad', idEspecialidad]);
  } else {
    console.warn('No se pudo obtener la especialidad de la enfermedad');
  }

  // Cierra el modal después de redirigir
  this.cerrarDetalle();
}

actualizarTermino(nuevoTermino: string): void {
  this.terminoBusqueda = nuevoTermino;
  this.buscarEnfermedades();
}

actualizarEspecialidad(id: number): void {
  this.especialidadSeleccionada = id;
  this.buscarEnfermedades(); // Filtra apenas cambia la especialidad
}





}
