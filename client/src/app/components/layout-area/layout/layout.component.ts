import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private router: Router) { }
  @HostListener("window:beforeunload", ["$event"])
  clearLocalStorage() {
    // console.log('HIIIII');
    localStorage.clear();
  }
  }
