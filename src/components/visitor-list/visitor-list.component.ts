import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Candidate} from '../../Model/Candidate/candidate';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {Visitor} from '../../Model/Visitor/visitor';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-visitor-list',
  standalone: true,
  imports: [
    RouterModule,
    MatPaginator
  ],
  templateUrl: './visitor-list.component.html',
  styleUrl: './visitor-list.component.css'
})
export class VisitorListComponent implements OnInit{
  visitors: Visitor[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(private visitorService: VisitorService) { }
  ngOnInit(): void {
    this.fetchVisitors();
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
    this.fetchVisitors();
  }

}
