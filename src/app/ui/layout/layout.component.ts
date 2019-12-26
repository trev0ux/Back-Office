import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public isCollapsed = true;

  menuActive = true;

  constructor(private authService:AuthService, private router: Router) { }

  public role : String;

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  closeMenu(){
    this.menuActive = false;
    console.log('Fechar menu');
  }

  openMenu(){
    this.menuActive = true;
    console.log('Abrir menu');
  }

  verificarResolucao(){
    if(window.innerWidth <= 992){
      this.menuActive = false;
    }
  }

  ngOnInit() {
    this.verificarResolucao();
     const user = this.authService.isAuthenticated();
     this.role = user.role;
  }

}
