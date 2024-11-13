import {Component, OnInit} from '@angular/core';
import { RouterModule} from '@angular/router';
import {EntryLogService} from '../../Services/EntryLog/entry-log.service';
import {MatPaginator} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-entry-log-list',
  standalone: true,
  imports: [RouterModule, MatPaginator, FormsModule, NgIf],
  templateUrl: './entry-log-list.component.html',
  styleUrl: './entry-log-list.component.css'
})
export class EntryLogListComponent implements OnInit {
  logs: any[] = []; // Initialize as an empty array
  totalElements: number = 0;
  page: number = 0;
  size: number = 1;
  showFilter: boolean = false;

  filterStartDate: string = '';
  filterEndDate: string = '';

  constructor(private logService: EntryLogService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logService.getPaginatedLogs(this.page, this.size).subscribe({
      next: (data: any) => {
        this.logs = data.content ?? []; // Ensure logs is always an array
        this.totalElements = data.totalPages;
      },
      error: (error) => {
        console.error('Failed to load logs:', error);
        this.logs = []; // Set logs to an empty array on error
      }
    });
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadLogs();
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter; // HIGHLIGHT CHANGE: Toggles filter visibility
  }

  applyDateFilter(): void {
    if (this.filterStartDate && this.filterEndDate) {
      this.logService.filterLogsByDate(this.filterStartDate, this.filterEndDate, this.page, this.size).subscribe({
        next: (data: any) => {
          this.logs = data.content ?? [];
          this.totalElements = data.totalElements;
        },
        error: (error) => console.error('Failed to filter logs:', error)
      });
    }
  }

}
