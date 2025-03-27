import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css'
})
export class NavBarAdminComponent {
  constructor(public authService: AuthService) {}
}
