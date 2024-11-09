import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alreadyexists',
  standalone: true,
  imports: [],
  templateUrl: './alreadyexists.component.html',
  styleUrl: './alreadyexists.component.css'
})
export class AlreadyexistsComponent {



  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 6000);
  }
}
