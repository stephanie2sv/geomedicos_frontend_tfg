import { Component, inject } from '@angular/core';
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
  userRole: string | null = null;

  public authService: AuthService = inject(AuthService);
  private router: Router = inject(Router); 

  constructor(

  ) {}

  ngOnInit() {
  this.authService.currentUser$.subscribe(user => {
    this.userRole = user?.role ?? null;
  });
}
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
