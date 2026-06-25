import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {
  showModal = false;
  selectedJob = '';
  selectedJobId = 0;
  coverLetter = '';
  successMsg = '';
  errorMsg = '';

  jobs: any[] = [
    { id: 1, title: 'Software Engineer', company: 'TechSolutions Pvt Ltd', location: 'Islamabad', type: 'Full Time', experience: '1-2 years', description: 'Looking for a skilled software engineer to develop and maintain web applications.', category: 'Technology' },
    { id: 2, title: 'Web Developer', company: 'DigitalCraft Studio', location: 'Remote', type: 'Remote', experience: '1 year', description: 'Looking for a web developer with knowledge of HTML, CSS and JavaScript. Fresh graduates welcome.', category: 'Technology' },
    { id: 3, title: 'Data Analyst', company: 'DataMinds Pakistan', location: 'Lahore', type: 'Full Time', experience: '2 years', description: 'We need a data analyst who can work with large datasets and provide business insights.', category: 'Technology' },
    { id: 4, title: 'Civil Engineer', company: 'BuildRight Constructors', location: 'Lahore', type: 'Full Time', experience: '2-3 years', description: 'Hiring a civil engineer to oversee construction projects and ensure quality standards.', category: 'Engineering' },
    { id: 5, title: 'Electrical Engineer', company: 'PowerGrid Pakistan', location: 'Karachi', type: 'Full Time', experience: '1-2 years', description: 'Work on power distribution projects and maintain electrical systems at industrial sites.', category: 'Engineering' },
    { id: 6, title: 'Mechanical Engineer', company: 'AutoTech Industries', location: 'Rawalpindi', type: 'Full Time', experience: '2 years', description: 'Design and maintain machinery used in our manufacturing plant.', category: 'Engineering' },
    { id: 7, title: 'Medical Officer', company: 'CarePoint Hospital', location: 'Rawalpindi', type: 'Full Time', experience: '2 years', description: 'Provide patient care and support the clinical team at our hospital.', category: 'Medical' },
    { id: 8, title: 'Pharmacist', company: 'HealthPlus Pharmacy', location: 'Islamabad', type: 'Full Time', experience: '1 year', description: 'Manage medicine dispensing, stock and customer consultation at our pharmacy.', category: 'Medical' },
    { id: 9, title: 'Medical Lab Technician', company: 'DiagnoLab Pvt Ltd', location: 'Lahore', type: 'Full Time', experience: '1-2 years', description: 'Perform diagnostic tests and manage laboratory equipment and records.', category: 'Medical' },
    { id: 10, title: 'Math Teacher', company: 'Beacon House School System', location: 'Islamabad', type: 'Full Time', experience: '1 year', description: 'Passionate math teacher needed for our secondary section.', category: 'Education' },
    { id: 11, title: 'University Lecturer - CS', company: 'Capital University of Science and Technology', location: 'Islamabad', type: 'Full Time', experience: '2 years', description: 'Lecturer position in the Computer Science department. MS or PhD preferred.', category: 'Education' },
    { id: 12, title: 'Accountant', company: 'FinTrack Consultants', location: 'Karachi', type: 'Full Time', experience: '2 years', description: 'Manage financial records, prepare reports and handle tax filings.', category: 'Business' },
    { id: 13, title: 'Bank Officer', company: 'Allied Bank Limited', location: 'Lahore', type: 'Full Time', experience: 'Fresh', description: 'Allied Bank is hiring fresh graduates for bank officer positions.', category: 'Business' },
    { id: 14, title: 'Content Writer', company: 'MediaHub Pakistan', location: 'Remote', type: 'Part Time', experience: 'Fresh', description: 'Produce articles, blogs and social media posts for our clients.', category: 'Media' },
    { id: 15, title: 'Digital Marketing Executive', company: 'BrandBoost Agency', location: 'Lahore', type: 'Full Time', experience: 'Fresh', description: 'Start your career in digital marketing, SEO and social media management.', category: 'Media' },
    { id: 16, title: 'SEO Specialist', company: 'RankUp Digital', location: 'Remote', type: 'Full Time', experience: '1 year', description: 'Improve website rankings, conduct keyword research and manage optimization.', category: 'Media' },
  ];

  categories = ['Technology', 'Engineering', 'Medical', 'Education', 'Business', 'Media'];

  constructor(private jobsService: JobsService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    $(document).ready(function () {
      $('.job-card').hide().each(function (i: number, el: any) {
        $(el).delay(i * 100).fadeIn(350);
      });
    });
  }

  getJobsByCategory(cat: string) {
    return this.jobs.filter(j => j.category === cat);
  }

  openApply(job: any) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.selectedJob = job.title + ' at ' + job.company;
    this.selectedJobId = job.id;
    this.coverLetter = '';
    this.successMsg = '';
    this.errorMsg = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitApplication() {
    if (!this.coverLetter.trim()) {
      this.errorMsg = 'Please write a cover letter.';
      return;
    }
    const userId = this.auth.getUserId();
    const job = this.jobs.find(j => j.id === this.selectedJobId);
    this.jobsService.applyForJob(this.selectedJobId, job.title, job.company, this.coverLetter, userId).subscribe({
      next: () => {
        this.successMsg = 'Application submitted successfully!';
        this.errorMsg = '';
        setTimeout(() => this.closeModal(), 1500);
      },
      error: () => {
        this.errorMsg = 'Failed to submit. Try again.';
      }
    });
  }
}