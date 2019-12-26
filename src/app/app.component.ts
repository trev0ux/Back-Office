import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backoffice-fastsalon';

  user: any;


  constructor(private authService: AuthService, private router: Router) {
    // let user: any = this.authService.isAuthenticated();
    // if (!user) {
    //   this.router.navigate(['/login']);
    // } else {
    //   this.user = user;
    //   this.router.navigate(['/']);
    // }

  }

}
