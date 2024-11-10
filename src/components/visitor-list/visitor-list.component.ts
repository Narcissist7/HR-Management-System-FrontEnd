import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Candidate} from '../../Model/Candidate/candidate';
import {VisitorService} from '../../Services/Visitor/visitor.service';
import {Visitor} from '../../Model/Visitor/visitor';

@Component({
  selector: 'app-visitor-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './visitor-list.component.html',
  styleUrl: './visitor-list.component.css'
})
export class VisitorListComponent implements OnInit{
  visitors: Visitor[] = [];
  candidate: Candidate = new Candidate();

  constructor(private visitorService: VisitorService) { }
  ngOnInit(): void {
    this.fetchVisitors();
  }

  fetchVisitors() {
    this.visitorService.getAllVisitors().subscribe((res) => {
      this.visitors = res;
      console.log(this.visitors);
    });
  }

}
