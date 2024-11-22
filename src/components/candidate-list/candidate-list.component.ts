import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../Model/Candidate/candidate';
import {CandidateService} from '../../Services/Candidate/candidate.service';
import {RouterModule} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {PaginatorModule} from 'primeng/paginator';
import {LoaderComponent} from '../Reusable/loader/loader.component';
import {NavbarComponent} from '../Reusable/navbar/navbar.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    RouterModule,
    MatPaginator,
    NgIf,
    FormsModule,
    LoaderComponent,
    NavbarComponent,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatTable
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

  constructor(private candidateService: CandidateService, private tokenService: tokenserviceService) {
  }

  ngOnInit(): void {

    if (this.tokenService.validateToken()) {
      this.loading = true;
      this.fetchCandidates();
    }
    else
    {
      alert("session expired!!!")
    }
  }

  fetchCandidates() {
    this.loading = true;
    if(!this.isSearching && this.searchQuery == null){
      this.candidateService.getPaginatedCandidates(this.page, this.size).subscribe(data => {
        this.candidates = data.content;
        this.totalElements = data.totalElements;
        console.log(this.candidates);
        console.log(this.totalElements);
        console.log(this.page);
        console.log(this.size);
        this.loading = false;
      });
    } else if(this.isSearching){
      this.candidateService.searchCandidatesByName(this.searchQuery, this.page, this.size).subscribe(data => {
        this.candidates = data.content;
        this.totalElements = data.totalElements;
        console.log(this.candidates);
        console.log(this.totalElements);
        console.log(this.page);
        console.log(this.size);
        this.loading = false;
      });
    }
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loading = true;
    this.fetchCandidates();
  }

  resetFilters() {
    this.searchQuery = null; // Clear search query
    this.isSearching = false;
    this.loading = true;
    this.fetchCandidates();
  }

  onSearch() {
    this.isSearching = true;
    this.loading = true;
    this.fetchCandidates();
  }
}
