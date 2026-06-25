import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = { email: '', password: '', remember: false };
  errors: any = {};
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errors = {};
    if (!this.form.email) this.errors.email = 'Email is required.';
    if (!this.form.password) this.errors.password = 'Password is required.';
    if (Object.keys(this.errors).length > 0) return;

    this.auth.login({ email: this.form.email, password: this.form.password }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token, res.name, res.accountType);
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: () => {
        this.errors.email = 'Invalid email or password.';
      }
    });
  }
}