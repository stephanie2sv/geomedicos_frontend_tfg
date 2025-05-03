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
import { normalizarTexto } from '../../utils/text-utils';
import { EspecialistaEncabezadoComponent } from "../../components/especialistas/especialista-encabezado/especialista-encabezado.component";
import { EspecialistaFiltrosComponent } from "../../components/especialistas/especialista-filtros/especialista-filtros.component";
import { CargandoSpinnerComponent } from "../../components/shared/cargando-spinner/cargando-spinner.component";
import { EspecialistaListadoMedicosComponent } from '../../components/especialistas/especialista-listado-medicos/especialista-listado-medicos.component';
import { EspecialistaPaginacionComponent } from '../../components/especialistas/especialista-paginacion/especialista-paginacion.component';
import { EnfermedadPaginacionComponent } from "../../components/enfermedades/enfermedad-paginacion/enfermedad-paginacion.component";

@Component({
  selector: 'app-especialista-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    EspecialistaDetalleComponent,
    EspecialistaEncabezadoComponent,
    EspecialistaFiltrosComponent,
    CargandoSpinnerComponent,
    EspecialistaListadoMedicosComponent,
    EspecialistaPaginacionComponent,
],
  templateUrl: './especialista-list.component.html',
  styleUrls: ['./especialista-list.component.css']
})
export class EspecialistaListComponent implements OnInit {
  medicos: IMedico[] = [];
  medicosFiltrados: IMedico[] = [];
  medicosPaginados: IMedico[] = [];
  especialidad: IEspecialidad | null = null;
  idEspecialidad: number = 0;

  terminoBusqueda: string = '';
  ordenSeleccionado: string = 'nombre';

  paginaActual: number = 1;
  elementosPorPagina: number = 6;
  totalPaginas: number = 0;
  numeroPaginas: number[] = [];

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
    this.route.params.subscribe(params => {
      this.idEspecialidad = +params['id'] || 0;
      this.cargarDatos();
      
    });
  }

  cargarDatos(): void {
    this.cargando = true;

    if (this.idEspecialidad > 0) {
      this.espeService.getEspecialidadPorId(this.idEspecialidad).subscribe({
        next: (data) => {
          this.especialidad = data;
        },
        error: () => {
          this.error = 'No se pudo cargar la información de la especialidad';
        }
      });

      this.mService.getMedicosPorEspecialidad(this.idEspecialidad).subscribe({
        next: (data) => {
          this.medicos = data;
          this.medicosFiltrados = [...data];
          this.aplicarFiltros();
          this.actualizarPaginacion();
          this.cargando = false;
        },
        error: () => {
          this.error = 'Error al cargar los médicos';
          this.cargando = false;
        }
      });
      console.log('Médicos recibidos:', this.medicos);
    } else {
      this.espeService.getEspecialidades().subscribe({
        next: (especialidades) => {
          this.medicos = [];
          let pendientes = especialidades.length;

          if (pendientes === 0) {
            this.medicosFiltrados = [];
            this.actualizarPaginacion();
            this.cargando = false;
            return;
          }

          especialidades.forEach((esp) => {
            this.mService.getMedicosPorEspecialidad(esp.idEspecialidad).subscribe({
              next: (medicosPorEsp) => {
                const medicosConEspecialidad = medicosPorEsp.map((medico) => ({
                  ...medico,
                  especialidades: [esp]
                }));

                this.medicos.push(...medicosConEspecialidad);
                pendientes--;

                if (pendientes === 0) {
                  this.medicosFiltrados = [...this.medicos];
                  this.aplicarFiltros();
                  this.actualizarPaginacion();
                  this.cargando = false;
                }
              },
              error: () => {
                this.error = `Error al cargar médicos de ${esp.nombre}`;
                this.cargando = false;
              }
            });
          });
        },
        error: () => {
          this.error = 'No se pudieron cargar las especialidades desde el servidor';
          this.cargando = false;
        }
      });
    }
  }

  buscarMedicos(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.cargando = true;
    this.paginaActual = 1;

    const termino = normalizarTexto(this.terminoBusqueda.trim());

    if (termino !== '') {
      this.medicosFiltrados = this.medicos.filter(medico =>
        normalizarTexto(medico.nombre).includes(termino) ||
        normalizarTexto(medico.apellidos).includes(termino) ||
        (medico.especialidades &&
          medico.especialidades.some((especialidad: any) =>
            typeof especialidad === 'string'
              ? normalizarTexto(especialidad).includes(termino)
              : normalizarTexto(especialidad.nombre || '').includes(termino)
          ))
      );
    } else {
      this.medicosFiltrados = [...this.medicos];
      console.log("aqui los medicos filtrados:",this.medicosFiltrados)
    }

    this.ordenarResultados();
    this.actualizarPaginacion();
    this.cargando = false;
  }
  ordenarResultados(): void {
    switch (this.ordenSeleccionado) {
      case 'nombre':
        this.medicosFiltrados.sort((a, b) => {
          const nombreA = a?.nombre ?? '';
          const nombreB = b?.nombre ?? '';
          return nombreA.localeCompare(nombreB);
        });
        break;
      case 'tarifa_asc':
        this.medicosFiltrados.sort((a, b) => (a?.tarifa ?? 0) - (b?.tarifa ?? 0));
        break;
      case 'tarifa_desc':
        this.medicosFiltrados.sort((a, b) => (b?.tarifa ?? 0) - (a?.tarifa ?? 0));
        break;
      case 'valoracion':
        this.medicosFiltrados.sort((a, b) => (b?.valoracionPromedio ?? 0) - (a?.valoracionPromedio ?? 0));
        break;
    }
  }
  
  cambiarOrden(nuevoOrden: string): void {
    this.ordenSeleccionado = nuevoOrden;
    this.ordenarResultados();
    this.actualizarPaginacion();
  }

//Metodosx de paginacion
actualizarPaginacion(): void {
  console.log('Filtradas:', this.medicosFiltrados.length);
console.log('Elementos por página:', this.elementosPorPagina);
  this.totalPaginas = Math.ceil(this.medicosFiltrados.length / this.elementosPorPagina);
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
  this.medicosPaginados = this.medicosFiltrados.slice(inicio, fin);
}

  verDetalle(medico: IMedico): void {
    this.medicoSeleccionado = medico;
  }

  cerrarDetalle(): void {
    this.medicoSeleccionado = null;
  }

  solicitarCita(medico: IMedico): void {
    console.log('Solicitando cita con:', medico.nombre);
    // this.router.navigate(['/citas/solicitar', medico.colegiado]);
  }

  actualizarTermino(nuevoTermino: string): void {
    this.terminoBusqueda = nuevoTermino || '';
    this.buscarMedicos();
  }
}
