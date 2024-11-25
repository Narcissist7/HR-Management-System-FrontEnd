import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EntryLog} from '../../Model/EntryLog/entry-log';
import {Candidate} from '../../Model/Candidate/candidate';
import {Visitor} from '../../Model/Visitor/visitor';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {NavbarComponent} from '../Reusable/navbar/navbar.component';

@Component({
  selector: 'app-entry-log-details',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './entry-log-details.component.html',
  styleUrl: './entry-log-details.component.css'
})
export class EntryLogDetailsComponent implements OnInit{
  logDetails: EntryLog = new EntryLog();
  visitorDetails: Visitor = new Visitor();
  candidateDetails: Candidate = new Candidate();
  userDetails: any;
  educations: Education[] = new Array<Education>();
  experiences: Experience[] = new Array<Experience>();
  imageUrl: string | null = null; // To store the image URL
  canidadteImageUrl: string | null = null ;



  constructor(private router: Router, private candidateService: CandidateService, private  visitorService: VisitorService , private tokenService:tokenserviceService) {
    this.logDetails = this.router.getCurrentNavigation()?.extras.state?.['data'];




    if (this.logDetails.role == "candidate") {
      candidateService.getCandidateBySSN(this.logDetails.ssn).subscribe({
        next: (data: Candidate) => {
          this.candidateDetails = data;
          this.educations = this.candidateDetails.educations;
          this.experiences = this.candidateDetails.experiences;
        }, error: err => {
          console.log("Error fetching Candidate details", err);
        }, complete: () => {
          if (!this.candidateDetails) {
            console.warn('No candidate details available.');
          }
        }
      });
    } else if (this.logDetails.role == "visitor") {
      visitorService.getVisitorBySSN(this.logDetails.ssn).subscribe({
        next: (data: Visitor) => {
          this.visitorDetails = data;
          console.log('Visitor Details:', this.visitorDetails);
        }, complete: () => {
          if (!this.visitorDetails) {
            console.warn('No visitor details available.');
          }
        }
      });
    } else {
      console.error('No log details available.');
    }

  }

  ngOnInit(): void {

    if (this.tokenService.validateToken()) {

      if (this.logDetails.role == "visitor")
      {

        this.loadVisitorImage();
      }
      else if (this.logDetails.role == "candidate")
      {

        this.loadCandiateImage();
      }
    }
    else
    {
      alert("session expired!!!")
    }
  }

  loadVisitorImage(): void {

    if (this.logDetails.ssn) {
      this.visitorService.getVisitorUserpic(this.logDetails.ssn).subscribe({
        next: (blob) => {
          // Create a URL for the image Blob
          this.imageUrl = URL.createObjectURL(blob);
          console.log(this.imageUrl); // Verify this is not undefined or empty

        },
        error: (err) => {
          console.error('Error loading visitor image:', err);
        }
      });
    }
  }

  loadCandiateImage(): void {

    if (this.logDetails.ssn) {
      this.candidateService.getCandidateUserpic(this.logDetails.ssn).subscribe({
        next: (blob) => {
          // Create a URL for the image Blob
          this.canidadteImageUrl = URL.createObjectURL(blob);
        },
        error: (err) => {
          console.error('Error loading visitor image:', err);
        }
      });
    }

  }


}
