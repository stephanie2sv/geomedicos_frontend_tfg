import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import{MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import{MatMenuModule} from '@angular/material/menu'
import{MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-nav-bar-general',
  standalone: true,
  imports: [RouterModule,CommonModule,MatButtonModule,MatToolbarModule,MatMenuModule,MatIconModule],
  templateUrl: './nav-bar-general.component.html',
  styleUrl: './nav-bar-general.component.css'
})
export class NavBarGeneralComponent {
  constructor(public authService: AuthService, private router:Router) {}



  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
