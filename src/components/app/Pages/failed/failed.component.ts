import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed',
  standalone: true,
  imports: [],
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 6000);
  }
}
