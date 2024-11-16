import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {Visitor} from '../../Model/Visitor/visitor';
import {MatPaginator} from '@angular/material/paginator';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

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
export class VisitorListComponent implements OnInit{
  visitors: Visitor[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;


  constructor(private visitorService: VisitorService, private router: Router) { }

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      console.log('JWT Token:', jwtToken);
    } else {
      this.router.navigate(['notAuthorized']);
    }
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
