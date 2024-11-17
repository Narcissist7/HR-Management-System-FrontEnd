import {Component, inject, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {Router} from '@angular/router';
import {tokenserviceService} from '../../Services/token/tokenservice.service';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [],
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.css'
})
export class CandidateDetailsComponent {
  candidateDetails: Candidate = new Candidate();
  educations: Education[] = new Array<Education>();
  experiences: Experience[] = new Array<Experience>();

  constructor(private router: Router , private tokenService:tokenserviceService) {
    this.candidateDetails = this.router.getCurrentNavigation()?.extras.state?.['data'];
    this.educations = this.candidateDetails.educations;
    this.experiences = this.candidateDetails.experiences;

    if (!this.candidateDetails) {
      console.warn('No candidate details available.');
    }

  }

  ngOnInit(): void {

    if (this.tokenService.validateToken() == true) {
    }
    else
    {
      alert("session expired!!!")
    }
  }

}
