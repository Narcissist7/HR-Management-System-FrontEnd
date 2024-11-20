import { Component } from '@angular/core';
import {Visitor} from '../../Model/Visitor/visitor';
import {Router} from '@angular/router';
import {tokenserviceService} from '../../Services/token/tokenservice.service';
import {NavbarComponent} from '../Reusable/navbar/navbar.component';

@Component({
  selector: 'app-visitor-details',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './visitor-details.component.html',
  styleUrl: './visitor-details.component.css'
})
export class VisitorDetailsComponent {
  visitorDetails: Visitor = new Visitor();

  constructor(private router: Router , private tokenService:tokenserviceService) {
    this.visitorDetails = this.router.getCurrentNavigation()?.extras.state?.['data'];

    if (!this.visitorDetails) {
      console.warn('No visitor details available.');
    }


  }

  ngOnInit(): void {

    if (this.tokenService.validateToken() == true) {

    }
    else
    {
      alert("session expired!!!")
    }
  }
}
