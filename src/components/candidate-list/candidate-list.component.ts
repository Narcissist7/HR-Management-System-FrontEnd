import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {Router, RouterModule} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {PaginatorModule} from 'primeng/paginator';
import {LoaderComponent} from '../Reusable/loader/loader.component';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    RouterModule,
    MatPaginator,
    PaginatorModule,
    LoaderComponent
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
  isSearching: boolean = false;
  loading: boolean = false;

  constructor(private candidateService: CandidateService, private router: Router, private tokenService: tokenserviceService) {
  }

  ngOnInit(): void {

    if (this.tokenService.validateToken() == true) {
      this.loading = true;
      this.fetchCandidates();
    }
    else
    {
      alert("session expired!!!")
    }
  }

  fetchCandidates() {
    if(!this.isSearching && this.searchQuery == null){
      this.candidateService.getPaginatedCandidates(this.page, this.size).subscribe(data => {
        this.candidates = data.content;
        this.totalElements = data.totalElements;
      });
        this.loading = false;
    } else if(this.isSearching){
      this.candidateService.searchCandidatesByName(this.searchQuery, this.page, this.size).subscribe(data => {
        this.candidates = data.content;
        this.totalElements = data.totalElements;
      });
        this.loading = false;
    }
  }

  onPageChange(event: any): void {
    this.loading = true;
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.fetchCandidates();
  }

  resetFilters() {
    this.loading = true;
    this.searchQuery = null; // Clear search query
    this.isSearching = false;
    this.fetchCandidates();
  }

  onSearch() {
    this.isSearching = true;
    this.fetchCandidates();
  }
}
