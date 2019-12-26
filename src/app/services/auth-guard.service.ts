import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    private url: String;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
        this.route.url.subscribe(activeUrl =>{
          this.url = window.location.pathname;
          console.log(this.url);
          
        });
    }

    canActivate() {
        const user = this.authService.isAuthenticated();
        if (!user && user != null && (user.role != 'Admin' && user.role != 'Owner')) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }

}
