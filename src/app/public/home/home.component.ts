import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule,RouterLink,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  terminoBusqueda: string = '';
  provinciaSeleccionada: string = '';

  constructor(private router: Router) {}

  buscar(): void {
    console.log('🔍 Buscando...');
    console.log('Término:', this.terminoBusqueda);
    console.log('Provincia:', this.provinciaSeleccionada);

    // Redirigir a página con resultados (modifica según tus rutas reales)
    this.router.navigate(['/especialistas'], {
      queryParams: {
        termino: this.terminoBusqueda,
        provincia: this.provinciaSeleccionada
      }
    });
  }
}

