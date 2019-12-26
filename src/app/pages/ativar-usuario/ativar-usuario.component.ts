import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-ativar-usuario',
  templateUrl: './ativar-usuario.component.html',
  styleUrls: ['./ativar-usuario.component.css']
})
export class AtivarUsuarioComponent implements OnInit {

  conteudo: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        console.log('Ativando usuário', params['id']);
        this.userService.activeCliente(params['id']).subscribe(data => {
          if (data) {
            this.conteudo = data['message'];
          }
        }, error => {
          this.conteudo = error.error.message;
          console.log(error);
        });
      }
    });
  }

  irParaHome() {
    this.router.navigate(['/']);
  }

}
