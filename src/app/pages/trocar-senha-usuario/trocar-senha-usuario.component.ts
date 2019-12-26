import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-trocar-senha-usuario',
  templateUrl: './trocar-senha-usuario.component.html',
  styleUrls: ['./trocar-senha-usuario.component.css']
})
export class TrocarSenhaUsuarioComponent implements OnInit {

  public usuario = {
    token: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  validado = false;

  trocaRealizada = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        console.log('Validando troca de senha usuário', params['id']);
        this.usuario.token = params['id'];
        this.userService.validarTrocaSenha(this.usuario.token).subscribe(data => {
          if (data && data['usuario']) {
            this.validado = true;
            this.usuario.email = data['usuario'].email;
          }
        }, error => {
          console.log(error);
        });
      }
    });
  }

  save() {
    if (this.usuario.password && this.usuario.confirm_password) {
      this.userService.trocarSenha(this.usuario).subscribe(data => {
        this.trocaRealizada = true;
      }, error => {
        console.log(error);
      });
    }
  }

  irParaHome() {
    this.router.navigate(['/']);
  }

}
