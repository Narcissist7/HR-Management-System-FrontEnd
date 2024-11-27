import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { tokenserviceService } from '../../Services/token/tokenservice.service';
import { NavbarComponent } from '../Reusable/navbar/navbar.component';
import { NgIf } from '@angular/common';

import {Visitor} from '../../Model/Visitor/visitor';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {CandidatePreviewModalComponent} from '../Reusable/candidate-preview-modal/candidate-preview-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-visitor-details',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf
  ],
  templateUrl: './visitor-details.component.html',
  styleUrl: './visitor-details.component.css'
})
export class VisitorDetailsComponent implements OnInit {
  visitorDetails: Visitor = new Visitor();
  imageUrl: string | null = null; // To store the image URL

  constructor(
    private router: Router,
    private visitorService: VisitorService,
    private tokenService: tokenserviceService,
    private dialog: MatDialog
  ) {
    this.visitorDetails = this.router.getCurrentNavigation()?.extras.state?.['data'];

    if (!this.visitorDetails) {
      console.warn('No visitor details available.');
    }
  }

  ngOnInit(): void {
    if (this.tokenService.validateToken()) {
      this.loadVisitorImage(); // Load the visitor's image if the token is valid
    } else {
      alert("Session expired!!!");
      this.router.navigate(['/login']); // Redirect to login if the session is expired
    }
  }

  loadVisitorImage(): void {
    const ssn = this.visitorDetails?.ssn;
    if (ssn) {
      this.visitorService.getVisitorUserpic(ssn).subscribe({
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

  loadVisitorID() {
    const ssn = this.visitorDetails?.ssn;
    if (ssn) {
      this.visitorService.getVisitorID(ssn).subscribe({
        next: (blob) => this.openPreview(blob, 'Candidate ID Preview', `${this.visitorDetails.name}_ID.png`, true),
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
