import { Component, OnInit } from '@angular/core';
import { IMedico } from '../../interfaces/imedico';
import { IEspecialidad } from '../../interfaces/iespecialidad';
import { EspecialidadesService } from '../../services/especialidades.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EspecialistaDetalleComponent } from '../especialista-detalle/especialista-detalle.component';
import { MedicosService } from '../../services/medicos.service';

@Component({
  selector: 'app-especialista-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EspecialistaDetalleComponent],
  templateUrl: './especialista-list.component.html',
  styleUrl: './especialista-list.component.css'
})
export class EspecialistaListComponent implements OnInit {

  //Datos Principales
  medicos: IMedico[] = [];
  medicosFiltrados: IMedico[] = [];
  medicosPaginados: IMedico[] = [];
  especialidad: IEspecialidad | null = null;
  idEspecialidad: number = 0;

  //filtros
  terminoBusqueda: string = '';
  ordenSeleccionado: string = 'nombre';

  //paginacion
  paginaActual: number = 1;
  elementosPorPagina: number = 6;
  totalPaginas: number = 0;
  numeroPaginas: number[] = [];

  //estado del componente
  medicoSeleccionado: IMedico | null = null;
  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private mService: MedicosService,
    private espeService: EspecialidadesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      //obtener el ID de especialidad de la URL
      this.route.params.subscribe(params => {
        this.idEspecialidad = +params['id'] || 0;
        this.cargarDatos();
      });
  }

  cargarDatos(): void {
    this.cargando = true;

    //cargar datos de la especialidad
    if (this.idEspecialidad > 0) {
      this.espeService.getEspecialidadPorId(this.idEspecialidad).subscribe({
        next: (data) => {
          this.especialidad = data;
        },
        error: (err) => {
          console.error('Error obteniendo especialidad', err);
          this.error = 'No se pudo cargar la informacion de la especialidad';
        }
      });

     //cargar medicos por especialidad
      this.mService.getMedicosPorEspecialidad(this.idEspecialidad).subscribe({
        next: (data) => {
          this.medicos = data;
          this.medicosFiltrados = data;
          this.aplicarFiltros();
          this.actualizarPaginacion();
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los medicos. Intente neuvamente mas tarde.';
          this.cargando = false;
          console.error('Error obteniendo medicos', err);
        }
      });
    } else {
      this.error = 'Especialidad no especificada';
      this.cargando = false;
    }
  }

  //metodos de busqueda y filtrado
  buscarMedicos(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.cargando = true;
    this.paginaActual = 1;

    //Filtrar por termino de busqueda si existe
    if ( this.terminoBusqueda.trim() !== '') {
      this.medicosFiltrados = this.medicos.filter(medico =>
        medico.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        (medico.apellidos && medico.apellidos.toLowerCase().includes(this.terminoBusqueda.toLowerCase()))
      );
    } else {
      this.medicosFiltrados = [...this.medicos];
    }

    //Aplicar ordenamiento
    this.ordenarResultados();

    this.actualizarPaginacion();
    this.cargando = false;
  }

  ordenarResultados(): void {
    switch (this.ordenSeleccionado) {
      case 'nombre':
        this.medicosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'tarifa_asc':
        this.medicosFiltrados.sort((a, b) => a.tarifa - b.tarifa);
        break;
      case 'tarifa_desc':
          this.medicosFiltrados.sort((a, b) => b.tarifa - a.tarifa);
        break;
      case 'valoracion':
          this.medicosFiltrados.sort((a, b) => (b.valoracionPromedio || 0) - (a.valoracionPromedio || 0));
        break;  
    }
  }


  cambiarOrden(): void {
    this.ordenarResultados();
    this.actualizarPaginacion();
  }

  //metodos de paginacion
  actualizarPaginacion(): void {
    this.totalPaginas = Math.ceil(this.medicosFiltrados.length / this.elementosPorPagina);
    this.numeroPaginas = Array.from({length: this.totalPaginas}, (_, i) => i + 1); 
    this.cambiarPagina(1);
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) {
      return;
    }

    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.medicosPaginados = this.medicosFiltrados.slice(inicio, fin);
  }

  //metodos de detalle
  verDetalle(medico: IMedico): void {
    this.medicoSeleccionado = medico;
  }

  cerrarDetalle(): void {
    this.medicoSeleccionado = null;
  }

  solicitarCita(medico: IMedico): void {
    // Aquí podrías navegar a un componente de citas
    console.log('Solicitando cita con:', medico.nombre);
    // Por ejemplo: this.router.navigate(['/citas/solicitar', medico.colegiado]);
  }

}
