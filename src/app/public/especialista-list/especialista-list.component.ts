import { Component, inject, OnInit, Output } from '@angular/core';
import { IEspecialidad } from '../../interfaces/iespecialidad';
import { EspecialidadesService } from '../../services/especialidades.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecialistaDetalleComponent } from '../especialista-detalle/especialista-detalle.component';
import { MedicosService } from '../../services/medicos.service';
import { normalizarTexto } from '../../utils/text-utils';
import { EspecialistaEncabezadoComponent } from "../../components/especialistas/especialista-encabezado/especialista-encabezado.component";
import { EspecialistaFiltrosComponent } from "../../components/especialistas/especialista-filtros/especialista-filtros.component";
import { CargandoSpinnerComponent } from "../../components/shared/cargando-spinner/cargando-spinner.component";
import { EspecialistaListadoMedicosComponent } from '../../components/especialistas/especialista-listado-medicos/especialista-listado-medicos.component';
import { EspecialistaPaginacionComponent } from '../../components/especialistas/especialista-paginacion/especialista-paginacion.component';
import { IMedicoCard } from '../../interfaces/MedicoCard';
import { SelectorHorarioComponent } from "../../components/especialistas/selector-horario/selector-horario.component";
import { AuthService } from '../../auth/services/auth.service';
import { Cita } from '../../interfaces/cita';
import { CitasService } from '../../services/citas-service.service';
import Swal from 'sweetalert2';

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
    SelectorHorarioComponent
],
  templateUrl: './especialista-list.component.html',
  styleUrls: ['./especialista-list.component.css']
})
export class EspecialistaListComponent implements OnInit {
  medicos: IMedicoCard[] = [];
  medicosFiltrados: IMedicoCard[] = [];
 @Output() medicosPaginados: IMedicoCard[] = [];
  especialidad: IEspecialidad | null = null;
  idEspecialidad: number = 0;

  terminoBusqueda: string = '';
  ordenSeleccionado: string = 'nombre';

  paginaActual: number = 1;
  elementosPorPagina: number = 6;
  totalPaginas: number = 0;
  numeroPaginas: number[] = [];

  medicoSeleccionado: IMedicoCard | null = null;
  cargando: boolean = true;
  error: string | null = null;

mostrarSelectorHorarios = false;
medicoParaCita!: IMedicoCard;
    private mService: MedicosService = inject(MedicosService);
    private espeService: EspecialidadesService= inject(EspecialidadesService);
    private authService: AuthService= inject(AuthService);
    private citasService:CitasService= inject(CitasService);
    private route: ActivatedRoute= inject(ActivatedRoute);
    private router: Router= inject(Router);

  constructor(

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEspecialidad = +params['id'] || 0;
      console.log("Recibido idEspecialidad:", this.idEspecialidad);
      this.cargarDatos();
      
    });
  }

  cargarDatos(): void {
    this.cargando = true;

    if (this.idEspecialidad > 0) {
      this.espeService.getEspecialidadPorId(this.idEspecialidad).subscribe({
        next: (data) => {
          this.especialidad = data;
          console.log(`➡️ Filtro por especialidad: ${data.nombre}`);
          this.terminoBusqueda = normalizarTexto(data.nombre);
          console.log('Filtro aplicado automáticamente con nombre de especialidad: ', this.terminoBusqueda);
          
        },
        error: () => {
          this.error = 'No se pudo cargar la información de la especialidad';
        }
      });

      this.mService.getMedicosPorEspecialidad(this.idEspecialidad).subscribe({
        next: (data) => {
          this.medicos = data;
          console.log('✅ Médicos recibidos desde API:', this.medicos);
          this.medicosFiltrados = [...data];

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
        normalizarTexto(medico.usuario.nombre).includes(termino) ||
        normalizarTexto(medico.usuario.apellidos).includes(termino) ||
        (medico.especialidades &&
          medico.especialidades.some((especialidad: any) =>
            typeof especialidad === 'string'
              ? normalizarTexto(especialidad).includes(termino)
              : normalizarTexto(especialidad.nombre || '')?.includes(termino)
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

  actualizarTermino(nuevoTermino: string): void {
      if (this.idEspecialidad > 0) {
    console.log('⛔ Ignorando filtro manual porque hay idEspecialidad:', this.idEspecialidad);
    return;
  }
    this.terminoBusqueda = nuevoTermino || '';
    this.buscarMedicos();
  }

  ordenarResultados(): void {
    switch (this.ordenSeleccionado) {
      case 'nombre':
        this.medicosFiltrados.sort((a, b) => {
          const nombreA = a?.usuario.nombre ?? '';
          const nombreB = b?.usuario.nombre ?? '';
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

  verDetalle(medico: IMedicoCard): void {
    this.medicoSeleccionado = medico;
  }

  cerrarDetalle(): void {
    this.medicoSeleccionado = null;
  }


  solicitarCita(medico: IMedicoCard) {
    this.medicoParaCita = medico;
    this.mostrarSelectorHorarios = true;
  }

  cerrarSelectorHorario() {
    this.mostrarSelectorHorarios = false;
  }

  crearCita(event: { fecha: Date; idHorario: number }) {
    const user = this.authService.getCurrentUserValue();
    const datosUsuario = user;

    if(datosUsuario){
      const nuevaCita: Cita = {
        idCita: 0,
        idUsuario: datosUsuario.idUsuario,
        nombrePaciente: `${datosUsuario.nombre} ${datosUsuario.apellidos}`,
        idMedico: this.medicoParaCita.usuario.idUsuario,
        nombreMedico: `${this.medicoParaCita.usuario.nombre} ${this.medicoParaCita.usuario.apellidos}`,
        fecha: event.fecha,
        estado: 'PENDIENTE',
        idHorario: event.idHorario
      }
    
      this.citasService.crearCita(nuevaCita).subscribe({
        next: () => {
          this.mostrarSelectorHorarios = false;
           Swal.fire({
        icon: 'success',
        title: 'Cita confirmada',
        text: 'Tu cita ha sido programada correctamente.',
        confirmButtonText: 'Ir al dashboard'
        }).then(() => {
        this.router.navigate(['/dashboard']);
          });
        },
        error: err => console.error('Error al crear cita:', err)
      });
    }
    
    }
    
  }


