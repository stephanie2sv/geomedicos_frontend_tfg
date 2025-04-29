import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar-general',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],  
  templateUrl: './nav-bar-general.component.html',
  styleUrls: ['./nav-bar-general.component.scss']
})
export class NavBarGeneralComponent {
  isMenuCollapsed = true;
  
  constructor(
    public authService: AuthService,
    private router: Router 
  ) {}

  
  irAreaPersonal(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
