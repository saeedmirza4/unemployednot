import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './applications.component.html'
})
export class ApplicationsComponent implements OnInit {
  applications: any[] = [];
  loading = true;
  editingId: number | null = null;
  editCoverLetter = '';
  message = '';
  messageType = '';

  constructor(private jobsService: JobsService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.jobsService.getMyApplications(userId).subscribe({
        next: (data) => {
          this.applications = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  startEdit(app: any): void {
    this.editingId = app.id;
    this.editCoverLetter = app.coverLetter;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editCoverLetter = '';
  }

  saveEdit(app: any): void {
    this.jobsService.updateApplication(app.id, this.editCoverLetter).subscribe({
      next: () => {
        app.coverLetter = this.editCoverLetter;
        this.editingId = null;
        this.showMessage('Application updated successfully.', 'success');
      },
      error: () => {
        this.showMessage('Failed to update application.', 'error');
      }
    });
  }

  deleteApp(id: number): void {
    if (!confirm('Are you sure you want to withdraw this application?')) return;
    this.jobsService.deleteApplication(id).subscribe({
      next: () => {
        this.applications = this.applications.filter(a => a.id !== id);
        this.showMessage('Application withdrawn.', 'success');
      },
      error: () => {
        this.showMessage('Failed to withdraw application.', 'error');
      }
    });
  }

  showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageType = type;
    $('html, body').animate({ scrollTop: 0 }, 400);
    setTimeout(() => { this.message = ''; }, 4000);
  }
}