import {Component} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {Router} from '@angular/router';
import {EntryLog} from '../../Model/EntryLog/entry-log';
import {Visitor} from '../../Model/Visitor/visitor';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {VisitorDetailsComponent} from '../visitor-details/visitor-details.component';
import {CandidateDetailsComponent} from '../candidate-details/candidate-details.component';

@Component({
  selector: 'app-entry-log-details',
  standalone: true,
  imports: [VisitorDetailsComponent, CandidateDetailsComponent],
  templateUrl: './entry-log-details.component.html',
  styleUrl: './entry-log-details.component.css'
})
export class EntryLogDetailsComponent {
  logDetails: EntryLog = new EntryLog();
  visitorDetails: Visitor = new Visitor();
  candidateDetails: Candidate = new Candidate();
  educations: Education[] = new Array<Education>();
  experiences: Experience[] = new Array<Experience>();

  constructor(private router: Router, candidateService: CandidateService, visitorService: VisitorService) {
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

}
