import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {Visitor} from '../../Model/Visitor/visitor';
import {MatPaginator} from '@angular/material/paginator';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {LoaderComponent} from '../Reusable/loader/loader.component';

@Component({
  selector: 'app-visitor-list',
  standalone: true,
  imports: [
    RouterModule,
    MatPaginator,
    NgIf,
    FormsModule,
    LoaderComponent
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
  loading: boolean = false;

  constructor(private visitorService: VisitorService, private router: Router, private tokenService: tokenserviceService) { }

  ngOnInit(): void {

    if (this.tokenService.validateToken() == true) {
      this.loading = true;
      this.fetchVisitors();
    }
    else
    {
      alert("session expired!!!")
    }
  }

  fetchVisitors() {
    this.visitorService.getPaginatedVisitors(this.page, this.size).subscribe(data => {
      this.visitors = data.content;
      this.totalElements = data.totalElements;
      this.loading = false;
    });
  }

  onPageChange(event: any): void {
    this.loading = true;
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.searchQuery ? this.searchVisitors() : this.fetchVisitors();
  }

  searchVisitors() {
    this.visitorService.searchVisitorsByName(this.searchQuery, this.page, this.size).subscribe(data => {
      this.visitors = data.content;
      this.totalElements = data.totalElements;
      this.loading = false;
    });
  }

  onSearch() {
    this.loading = true;
    this.page = 0; // Reset page on new search
    this.searchVisitors();
  }

  resetFilters() {
    this.loading = true;
    this.searchQuery = ''; // Clear search query
    this.page = 0; // Reset pagination to first page
    this.fetchVisitors(); // Reload all visitors
  }
}
