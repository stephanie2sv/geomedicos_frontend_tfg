import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { correo, password } = this.loginForm.value;

    this.authService.login({ correo, password }).subscribe({
      next: user => {
            if (user.role === 'ADMON') {
        this.router.navigate(['/dashboard-admin']);
      } else if (user.role === 'PACIENTE' || user.role === 'DOCTOR') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
      },
      error: err => {
        this.errorMsg = 'Correo o contraseña incorrectos.';
        console.error('Login error:', err);
      }
    });
  }
}

