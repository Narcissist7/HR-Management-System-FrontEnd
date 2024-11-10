import { Component } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'app-sucess',
  standalone: true,
  imports: [],
  templateUrl: './sucess.component.html',
  styleUrl: './sucess.component.css',

})
export class SucessComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 6000);
  }
}




