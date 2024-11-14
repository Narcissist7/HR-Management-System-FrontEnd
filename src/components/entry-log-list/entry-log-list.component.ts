import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntryLogService } from '../../Services/EntryLog/entry-log.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { EntryLog } from '../../Model/EntryLog/entry-log';
import { EntryLogFilterRequestDTO } from '../../Model/EntryLog/EntryLogFilterRequestDto/entry-log-filter-dto'; // Import your DTO

@Component({
  selector: 'app-entry-log-list',
  standalone: true,
  imports: [RouterModule, MatPaginator, FormsModule, NgIf, NgForOf],
  templateUrl: './entry-log-list.component.html',
  styleUrls: ['./entry-log-list.component.css']
})
export class EntryLogListComponent implements OnInit {
  logs: EntryLog[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10; // Default page size
  showDateFilter: boolean = false;
  showTimeFilter: boolean = false;
  showVisiteeFilter: boolean = false;
  showRoleFilter: boolean = false;
  // visitees: string[] = []; // Populate this with actual visitee data

  // Initialize the filterRequest as an instance of EntryLogFilterRequestDTO
  filterRequest: EntryLogFilterRequestDTO = new EntryLogFilterRequestDTO();
  constructor(private logService: EntryLogService) {}

  ngOnInit(): void {
    this.loadLogs();
    // this.loadVisitees(); // Load visitees for the filter
  }

  loadLogs(): void {
    this.logService.getPaginatedLogs(this.page, this.size).subscribe({
      next: (data: any) => {
        this.logs = data.content ?? [];
        this.totalElements = data.totalElements;
      },
      error: (error) => {
        console.error('Failed to load logs:', error);
        this.logs = [];
      }
    });
  }

  // loadVisitees(): void {
  //   // Fetch the list of visitees from the service
  //   this.logService.getVisitees().subscribe({
  //     next: (data: string[]) => {
  //       this.visitees = data;
  //     },
  //     error: (error) => {
  //       console.error('Failed to load visitees:', error);
  //     }
  //   });
  // }

  applyFilter(): void {
    this.logService.filterLogs(this.filterRequest, this.page, this.size).subscribe({
      next: (data: any) => {
        this.logs = data.content ?? [];
        this.totalElements = data.totalElements;
      },
      error: (error) => {
        console.error('Failed to apply filter:', error);
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

  toggleVisiteeFilter(): void {
    this.showVisiteeFilter = !this.showVisiteeFilter;
  }

  toggleRoleFilter(): void {
    this.showRoleFilter = !this.showRoleFilter;
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadLogs();
  }
}
