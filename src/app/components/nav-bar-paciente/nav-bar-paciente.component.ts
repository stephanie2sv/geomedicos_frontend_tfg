import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-paciente',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar-paciente.component.html',
  styleUrl: './nav-bar-paciente.component.css'
})
export class NavBarPacienteComponent {
  constructor(public authService: AuthService) {}
}
