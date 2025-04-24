import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar-general',
  standalone: true,
  imports: [RouterModule, CommonModule], //NgbDropdownModule
  templateUrl: './nav-bar-general.component.html',
  styleUrl: './nav-bar-general.component.css'
})
export class NavBarGeneralComponent {
  isMenuCollapsed = true;
  constructor(public authService: AuthService) {}
}
