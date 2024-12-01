import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';



@Component({
  selector: 'app-sucess',
  standalone: true,
  imports: [
    ToastModule
  ],
  templateUrl: './sucess.component.html',
  styleUrl: './sucess.component.css',
  providers:[MessageService]

})
export class SucessComponent {

  constructor(private router: Router , private messageService : MessageService) {}

  ngOnInit() {

    this.showSuccess()
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 4000);


  }



  showSuccess() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Redirection',
      detail: 'You will be redirected to Home page',
      life: 4000
    });
  }

}



