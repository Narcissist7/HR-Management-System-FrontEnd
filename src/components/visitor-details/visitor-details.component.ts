import { Component } from '@angular/core';
import {Visitor} from '../../Model/Visitor/visitor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visitor-details',
  standalone: true,
  imports: [],
  templateUrl: './visitor-details.component.html',
  styleUrl: './visitor-details.component.css'
})
export class VisitorDetailsComponent {
  visitorDetails: Visitor = new Visitor();

  constructor(private router: Router) {
    this.visitorDetails = this.router.getCurrentNavigation()?.extras.state?.['data'];

    if (!this.visitorDetails) {
      console.warn('No visitor details available.');
    }
  }
}
