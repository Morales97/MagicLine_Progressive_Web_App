import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'MLapp';
  currentUser: any;

  constructor(
      private router: Router,
      private authService: AuthService
  ) {
      // subscribe to currentUser to know if user is logged in/out
      this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
  }
}
