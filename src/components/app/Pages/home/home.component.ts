import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {LoaderComponent} from '../../../Reusable/loader/loader.component';
import {NtgAppsLoaderComponent} from '../../../Reusable/ntg-apps-loader/ntg-apps-loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    LoaderComponent,
    NtgAppsLoaderComponent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loading: boolean = true;
  constructor(private router: Router) {}

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;  // Hide loader after a short delay
    }, 3000);}
}
