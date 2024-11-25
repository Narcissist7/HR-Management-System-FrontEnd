import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.css'
})
export class NotAuthorizedComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2500);
  }
}
