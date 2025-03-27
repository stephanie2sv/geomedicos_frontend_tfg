import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-medico',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar-medico.component.html',
  styleUrl: './nav-bar-medico.component.css'
})
export class NavBarMedicoComponent {
  constructor(public authService: AuthService) {}
}
