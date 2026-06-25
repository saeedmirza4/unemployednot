import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form = {
    fullname: '', email: '', password: '', phone: '',
    city: '', accounttype: 'jobseeker', dob: '', terms: false
  };
  errors: any = {};
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errors = {};
    if (!this.form.fullname) this.errors.fullname = 'Full name is required.';
    if (!this.form.email) this.errors.email = 'Email is required.';
    if (!this.form.password || this.form.password.length < 6) this.errors.password = 'Password must be at least 6 characters.';
    if (!this.form.phone || !/^03\d{9}$/.test(this.form.phone)) this.errors.phone = 'Phone must be in 03XXXXXXXXX format.';
    if (!this.form.city) this.errors.city = 'City is required.';
    if (!this.form.accounttype) this.errors.accounttype = 'Please select an account type.';
    if (!this.form.dob) this.errors.dob = 'Date of birth is required.';
    if (!this.form.terms) this.errors.terms = 'You must agree to the terms.';
    if (Object.keys(this.errors).length > 0) return;

    this.auth.register({
      name: this.form.fullname,
      email: this.form.email,
      password: this.form.password,
      phone: this.form.phone,
      city: this.form.city,
      accountType: this.form.accounttype,
      dateOfBirth: this.form.dob
    }).subscribe({
      next: () => {
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errors.email = err.error?.message || 'Registration failed.';
      }
    });
  }
}