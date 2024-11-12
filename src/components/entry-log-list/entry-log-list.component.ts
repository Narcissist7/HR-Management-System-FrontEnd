import {Component, OnInit} from '@angular/core';
import { RouterModule} from '@angular/router';
import {EntryLog} from '../../Model/EntryLog/entry-log';
import {EntryLogService} from '../../Services/EntryLog/entry-log.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-entry-log-list',
  standalone: true,
  imports: [RouterModule, MatPaginator],
  templateUrl: './entry-log-list.component.html',
  styleUrl: './entry-log-list.component.css'
})
export class EntryLogListComponent implements OnInit {
  logs: any[] = []; // Initialize as an empty array
  currentPage: number = 0;
  totalPages: number = 1;
  pageSize: number = 8;

  constructor(private logService: EntryLogService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logService.getPaginatedLogs(this.currentPage, this.pageSize).subscribe({
      next: (data: any) => {
        this.logs = data.content ?? []; // Ensure logs is always an array
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Failed to load logs:', error);
        this.logs = []; // Set logs to an empty array on error
      }
    });
  }

  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadLogs();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
