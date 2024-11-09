import {Component, inject, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [],
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.css'
})
export class CandidateDetailsComponent implements OnInit {
  candidateDetails: Candidate = new Candidate();
  educations: Education[] = new Array<Education>();
  experiences: Experience[] = new Array<Experience>();

  constructor(private router: Router) {
    this.candidateDetails = this.router.getCurrentNavigation()?.extras.state?.['data'];
    this.educations = this.candidateDetails.educations;
    this.experiences = this.candidateDetails.experiences;

    if (!this.candidateDetails) {
      console.warn('No candidate details available.');
    }
}

  ngOnInit(): void {

  }

}
