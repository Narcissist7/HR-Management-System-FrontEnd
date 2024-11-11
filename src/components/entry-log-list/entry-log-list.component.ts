import {Component, OnInit} from '@angular/core';
import { RouterModule} from '@angular/router';
import {EntryLog} from '../../Model/EntryLog/entry-log';
import {EntryLogService} from '../../Services/EntryLog/entry-log.service';

@Component({
  selector: 'app-entry-log-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './entry-log-list.component.html',
  styleUrl: './entry-log-list.component.css'
})
export class EntryLogListComponent implements OnInit {
  logs: EntryLog[] = [];

  constructor(private logService: EntryLogService) { }
  ngOnInit(): void {
    this.fetchEntryLogs();
  }

  fetchEntryLogs() {
    this.logService.getAllLogs().subscribe((res) => {
      this.logs = res;
      console.log(this.logs);
    });
  }
}
