import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import { RouterModule} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    RouterModule,
    MatPaginator
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.fetchCandidates();
  }

  fetchCandidates() {
    // this.candidateService.getAllCandidate().subscribe((res) => {
    //   this.candidates = res;
    //   console.log(this.candidates);
    // });

    this.candidateService.getPaginatedCandidates(this.page, this.size).subscribe(data => {
      this.candidates = data.content;
      this.totalElements = data.totalElements;
    });
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.fetchCandidates();
  }

}
