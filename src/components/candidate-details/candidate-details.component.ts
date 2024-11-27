import {Component, inject, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {Router} from '@angular/router';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {NavbarComponent} from '../Reusable/navbar/navbar.component';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {CandidateService} from '../../Services/Candidate/candidate.service';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.css'
})
export class CandidateDetailsComponent {
  candidateDetails: Candidate = new Candidate();
  educations: Education[] = new Array<Education>();
  experiences: Experience[] = new Array<Experience>();
  imageUrl: string | null = null; // To store the image URL


  constructor(private router: Router , private tokenService:tokenserviceService , private candidateService : CandidateService) {
    this.candidateDetails = this.router.getCurrentNavigation()?.extras.state?.['data'];
    this.educations = this.candidateDetails.educations;
    this.experiences = this.candidateDetails.experiences;

    if (!this.candidateDetails) {
      console.warn('No candidate details available.');
    }

  }

  ngOnInit(): void {

    if (this.tokenService.validateToken() == true) {
      this.loadCandiateImage()
    }
    else
    {
      alert("session expired!!!")
    }
  }

  loadCandiateImage(): void {
    const ssn = this.candidateDetails?.ssn;
    if (ssn) {
      this.candidateService.getCandidateUserpic(ssn).subscribe({
        next: (blob) => {
          // Create a URL for the image Blob
          this.imageUrl = URL.createObjectURL(blob);
        },
        error: (err) => {
          console.error('Error loading visitor image:', err);
        }
      });
    }
  }

  downloadCv() {
    const ssn = this.candidateDetails?.ssn;
    if (ssn) {
      this.candidateService.getCandidateCv(ssn).subscribe({
        next: (blob) => {
          // Create a URL for the Blob
          const url = window.URL.createObjectURL(blob);
          // Create a link element and trigger download
          const a = document.createElement('a');
          a.href = url;
          a.download = `Candidate_CV_${ssn}.pdf`; // Set the desired file name and extension
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url); // Clean up the URL object
        },
        error: (err) => {
          console.error('Error downloading CV:', err);
          alert('Failed to download the CV. Please try again.');
        }
      });
    } else {
      alert('Invalid candidate details. Cannot download CV.');
    }
  }

  loadCandidateID() {
    const ssn = this.candidateDetails?.ssn;
    if (ssn) {
      this.candidateService.getCandidateID(ssn).subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.candidateDetails.name}_ID.png`; // Modify the file name and extension as needed
          a.click();
          URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error fetching candidate ID:', err);
        }
      });
    }
  }
}
