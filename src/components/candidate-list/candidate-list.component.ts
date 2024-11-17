import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {Router, RouterModule} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    RouterModule,
    MatPaginator,
    PaginatorModule
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 7;
  searchQuery: any;

  constructor(private candidateService: CandidateService, private router: Router, private tokenService: tokenserviceService) {
  }

  ngOnInit(): void {

    if (this.tokenService.validateToken() == true) {
      this.fetchCandidates();
    }
    else
    {
      alert("session expired!!!")
    }
  }

  fetchCandidates() {
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

  resetFilters() {
    this.searchQuery = ''; // Clear search query
    this.page = 0; // Reset pagination to first page
    this.fetchCandidates(); // Reload all visitors
  }

  onSearch() {
    this.page = 0; // Reset page on new search
    this.searchCandidates();
  }

  private searchCandidates() {
    this.candidateService.searchCandidatesByName(this.searchQuery, this.page, this.size).subscribe(data => {
      this.candidates = data.content;
      this.totalElements = data.totalElements;
    });
  }
}
