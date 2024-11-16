import { Component } from '@angular/core';
import {Visitor} from '../../Model/Visitor/visitor';
import {Router} from '@angular/router';
import {tokenserviceService} from '../../Services/token/tokenservice.service';

@Component({
  selector: 'app-visitor-details',
  standalone: true,
  imports: [],
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

    const  jwtToken = localStorage.getItem('token');
    if (jwtToken && !this.tokenService.isTokenExpired(jwtToken)){

    } else {
      this.tokenService.logout();
    }

  }
}
