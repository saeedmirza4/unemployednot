import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private api = 'http://localhost:5039/api';

  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get<any[]>(`${this.api}/jobs`);
  }

  applyForJob(jobId: number, jobTitle: string, company: string, coverLetter: string, userId: number) {
    return this.http.post(`${this.api}/applications`, {
      jobId,
      jobTitle,
      company,
      userId,
      coverLetter,
      status: 'pending'
    });
  }

  getMyApplications(userId: number) {
    return this.http.get<any[]>(`${this.api}/applications/user/${userId}`);
  }

  updateApplication(id: number, coverLetter: string) {
    return this.http.put(`${this.api}/applications/${id}`, {
      coverLetter,
      status: 'pending'
    });
  }

  deleteApplication(id: number) {
    return this.http.delete(`${this.api}/applications/${id}`);
  }
}