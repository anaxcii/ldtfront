import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LDT';
  constructor(private router: Router) {}

  isNotLoginPage(): boolean {
    const currentUrl = this.router.url;
    return !currentUrl.startsWith('/auth');
  }
}
