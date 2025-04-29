import { Component, OnInit } from '@angular/core';
import { Clinica } from '../../interfaces/clinica';
import { ClinicasService } from '../../services/clinicas-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClinicasEncabezadoComponent } from '../../components/clinicas/clinicas-encabezado/clinicas-encabezado.component';
import { ClinicasFiltrosComponent } from "../../components/clinicas/clinicas-filtros/clinicas-filtros.component";
import { CargandoSpinnerComponent } from "../../components/shared/cargando-spinner/cargando-spinner.component";
import { ClinicasListadoComponent } from "../../components/clinicas/clinicas-listado/clinicas-listado.component";
import { ClinicasPaginacionComponent } from "../../components/clinicas/clinicas-paginacion/clinicas-paginacion.component";


@Component({
  selector: 'app-clinicas-list',
  standalone:true,
  imports: [CommonModule, FormsModule, ClinicasEncabezadoComponent, ClinicasFiltrosComponent, CargandoSpinnerComponent, ClinicasListadoComponent, ClinicasPaginacionComponent],
  templateUrl: './clinicas-list.component.html',
  styleUrls: ['./clinicas-list.component.css']
})
export class ClinicasListComponent implements OnInit {
  clinicas: Clinica[] = [];
  clinicasFiltradas: Clinica[] = [];
  clinicasPaginadas: Clinica[] = [];

  terminoBusqueda: string = '';

  paginaActual: number = 1;
  elementosPorPagina: number = 6;
  totalPaginas: number = 0;

  cargando: boolean = true;
  error: string | null = null;

  constructor(private clinicasService: ClinicasService) {}

  ngOnInit(): void {
    this.cargarTodas();
  }

  cargarTodas(): void {
    this.cargando = true;
    this.clinicasService.getTodas().subscribe({
      next: (data) => {
        this.clinicas = data;
        this.aplicarFiltros();
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar clínicas';
        this.cargando = false;
      }
    });
  }

  aplicarFiltros(): void {
    const termino = this.terminoBusqueda.trim().toLowerCase();

    if (termino) {
      this.clinicasFiltradas = this.clinicas.filter(c =>
        c.nombre.toLowerCase().includes(termino)
      );
    } else {
      this.clinicasFiltradas = [...this.clinicas];
    }

    this.actualizarPaginacion();
  }

  actualizarPaginacion(): void {
    this.totalPaginas = Math.ceil(this.clinicasFiltradas.length / this.elementosPorPagina);
    this.cambiarPagina(1);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.clinicasPaginadas = this.clinicasFiltradas.slice(inicio, fin);
  }

  actualizarTermino(nuevoTermino: string): void {
    this.terminoBusqueda = nuevoTermino;
    this.aplicarFiltros();
  }
}

