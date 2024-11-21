import {EntryLogFilterRequestDTO} from '../../Model/EntryLog/EntryLogFilterRequestDto/entry-log-filter-dto';
import {EntryLogService} from '../../Services/EntryLog/entry-log.service';
import {EntryLog} from '../../Model/EntryLog/entry-log';
import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {LoaderComponent} from '../Reusable/loader/loader.component';
import {NavbarComponent} from '../Reusable/navbar/navbar.component';

@Component({
  selector: 'app-entry-log-list',
  standalone: true,
  imports: [RouterModule, MatPaginator, FormsModule, NgIf, NgForOf, LoaderComponent, NavbarComponent],
  templateUrl: './entry-log-list.component.html',
  styleUrls: ['./entry-log-list.component.css']
})

export class EntryLogListComponent implements OnInit {
  logs: EntryLog[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10; // Default page size
  loading: boolean = false;
  showDateFilter: boolean = false;
  showTimeFilter: boolean = false;
  // showVisiteeFilter: boolean = false;
  showRoleFilter: boolean = false;


  filterRequest: EntryLogFilterRequestDTO = new EntryLogFilterRequestDTO();

  constructor(private logService: EntryLogService , private router : Router , private tokenService:tokenserviceService) {}

  ngOnInit(): void {

    if (this.tokenService.validateToken()) {
      this.loading = true;
      this.loadLogs();
    }
    else
    {
      alert("session expired!!!")
    }
  }


  loadLogs(): void {
    this.loading = true;
    this.logService.getPaginatedLogs(this.page, this.size).subscribe({
      next: (data: any) => {
        this.logs = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load logs:', error);
        this.logs = [];
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    this.loading = true;
    this.logService.filterLogs(this.filterRequest, this.page, this.size).subscribe({
      next: (data: any) => {
        this.logs = data.content ;
        this.totalElements = data.totalElements;
        this.loading = false;
        console.log(this.logs);
      },
      error: (error) => {
        console.error('Failed to apply filter:', error);
        this.loading = false;
      }
    });
  }

  filterToday(): void {
    const today = new Date();
    this.filterRequest.startDate = today;
    this.filterRequest.endDate = today;
    this.applyFilter();
  }

  toggleDateFilter(): void {
    this.showDateFilter = !this.showDateFilter;
  }

  toggleTimeFilter(): void {
    this.showTimeFilter = !this.showTimeFilter;
  }

  // toggleVisiteeFilter(): void {
  //   this.showVisiteeFilter = !this.showVisiteeFilter;
  // }

  toggleRoleFilter(): void {
    this.showRoleFilter = !this.showRoleFilter;
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadLogs();
  }

  resetFilters() {
    this.filterRequest = new EntryLogFilterRequestDTO();
    this.applyFilter();
  }
}
