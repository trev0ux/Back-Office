import { Component, OnInit, Host } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(@Host() public app:AppComponent, private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    // this.router.navigate(['/dashboards/dashboard1']);
    this.authService.signIn(this.form.controls.uname.value, this.form.controls.password.value).toPromise()
      .then(lUser => {
        this.app.user = lUser;
        const user = lUser;
        if (user.role != 'Admin' && user.role != 'Owner') {
            this.form.reset();
        } else {
            this.router.navigate(['/dashboards/dashboard2']);
        }

        
      })
      .catch(() => {
        this.form.reset();
      });
  }

}
