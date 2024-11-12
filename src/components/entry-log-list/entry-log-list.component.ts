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
  logs: EntryLog[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(private logService: EntryLogService) { }
  ngOnInit(): void {
    this.fetchEntryLogs();
  }

  fetchEntryLogs() {
    // this.logService.getAllLogs().subscribe((res) => {
    //   this.logs = res;
    //   console.log(this.logs);

    this.logService.getPaginatedLogs(this.page, this.size).subscribe(data => {
      this.logs = data.content;
      this.totalElements = data.totalElements;
      console.log(this.logs);
    });
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.fetchEntryLogs();
  }

}
