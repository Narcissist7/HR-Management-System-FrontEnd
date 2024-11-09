import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {NgForOf} from '@angular/common';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterModule
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  candidate: Candidate = new Candidate();

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.candidateService.getAllCandidate().subscribe((res) => {
      this.candidates = res;
      console.log(this.candidates);
    });
  }

}
