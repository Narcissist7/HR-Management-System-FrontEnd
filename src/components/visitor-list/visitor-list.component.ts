import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {Visitor} from '../../Model/Visitor/visitor';
import {MatPaginator} from '@angular/material/paginator';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {tokenserviceService} from '../../Services/token/tokenservice.service';

@Component({
  selector: 'app-visitor-list',
  standalone: true,
  imports: [
    RouterModule,
    MatPaginator,
    NgIf,
    FormsModule
  ],
  templateUrl: './visitor-list.component.html',
  styleUrl: './visitor-list.component.css'
})
export class VisitorListComponent implements OnInit {
  visitors: Visitor[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;
  searchQuery: string = '';

  constructor(private visitorService: VisitorService, private router: Router, private tokenService: tokenserviceService) { }

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken && !this.tokenService.isTokenExpired(jwtToken)) {
      this.fetchVisitors();
    } else {
      this.tokenService.logout();
    }
  }

  fetchVisitors() {
    this.visitorService.getPaginatedVisitors(this.page, this.size).subscribe(data => {
      this.visitors = data.content;
      this.totalElements = data.totalElements;
    });
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.searchQuery ? this.searchVisitors() : this.fetchVisitors();
  }

  searchVisitors() {
    this.visitorService.searchVisitorsByName(this.searchQuery, this.page, this.size).subscribe(data => {
      this.visitors = data.content;
      this.totalElements = data.totalElements;
    });
  }

  onSearch() {
    this.page = 0; // Reset page on new search
    this.searchVisitors();
  }

  resetFilters() {
    this.searchQuery = ''; // Clear search query
    this.page = 0; // Reset pagination to first page
    this.fetchVisitors(); // Reload all visitors
  }
}
