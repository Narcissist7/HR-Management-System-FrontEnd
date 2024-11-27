import {Component, inject, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {Router} from '@angular/router';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {NavbarComponent} from '../Reusable/navbar/navbar.component';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {MatDialog} from '@angular/material/dialog';
import {CandidatePreviewModalComponent} from '../Reusable/candidate-preview-modal/candidate-preview-modal.component';

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


  constructor(private router: Router , private tokenService:tokenserviceService , private candidateService : CandidateService, private dialog: MatDialog) {
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
        next: (blob) => this.openPreview(blob, 'Candidate CV Preview', `Candidate_CV_${ssn}.pdf`, false),
        error: (err) => console.error('Error downloading CV:', err),
      });
    } else {
      alert('Invalid candidate details. Cannot download CV.');
    }
  }

  loadCandidateID() {
    const ssn = this.candidateDetails?.ssn;
    if (ssn) {
      this.candidateService.getCandidateID(ssn).subscribe({
        next: (blob) => this.openPreview(blob, 'Candidate ID Preview', `${this.candidateDetails.name}_ID.png`, true),
        error: (err) => console.error('Error fetching candidate ID:', err),
      });
    }
  }


  openPreview(blob: Blob, title: string, fileName: string, isImage: boolean): void {
    const objectUrl = URL.createObjectURL(blob);
    const previewData = {
      content: objectUrl,
      title: title,
      fileName: fileName,
      isImage: isImage,
    };

    this.dialog.open(CandidatePreviewModalComponent, {
      data: previewData,
      width: '90%',  // Less aggressive than full screen
      height: '90%',
      maxWidth: '1200px'  // Optional: limit maximum width
    });
  }
}
