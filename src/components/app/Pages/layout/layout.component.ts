import { Component } from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule , NgIf , NgFor ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {


}
