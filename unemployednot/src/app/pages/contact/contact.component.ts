import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  form = { name: '', email: '', subject: '', message: '' };
  errors: any = {};
  submitted = false;

  validate() {
    this.errors = {};
    if (!this.form.name.trim()) this.errors.name = 'Full name is required.';
    if (!this.form.email.trim()) {
      this.errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
      this.errors.email = 'Enter a valid email address.';
    }
    if (!this.form.subject.trim()) this.errors.subject = 'Subject is required.';
    if (!this.form.message.trim()) {
      this.errors.message = 'Message is required.';
    } else if (this.form.message.trim().length < 10) {
      this.errors.message = 'Message must be at least 10 characters.';
    }
    return Object.keys(this.errors).length === 0;
  }

  onSubmit() {
    if (this.validate()) {
      this.submitted = true;
      $('html, body').animate({ scrollTop: 0 }, 400);
    }
  }
}