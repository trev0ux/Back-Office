import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { BaseComponent } from 'src/app/core/base/base-component';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-cadastrar-clientes',
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})
export class CadastrarClientesComponent extends BaseComponent implements OnInit {

  alerts: Alert[];
  public maskPhone: string;

  public userModel: User;

  public modoAlteracao: boolean;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    super();

    this.modoAlteracao = false;

    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.modoAlteracao = true;
        let lClienteModel: any;
        lClienteModel = {
          _id: params['id']
        };

        userService.getOne(lClienteModel).subscribe((data: any) => {
          this.userModel = <User>data.hero[0];
        });
      }
    });
  }

  ngOnInit() {
    this.alerts = [];
    this.userModel = {};
    this.maskPhone = this.getMaskPhone();
  }

  public onKeydownPhone(event) {
    if (event.target && !this.isNullOrUndefinedOrEmpty(event.target.value)) {
      this.maskPhone = this.getMaskPhone(event.target.value);
    }
  }

  public cancel() {
    this.router.navigate(['/clientes']);
  }

  public save() {
    const client = Object.assign({}, this.userModel);

    if (!client.name) {
      this.addAlertWarn('O campo Nome é obrigatório');
      return;
    }
    if (!client.email) {
      this.addAlertWarn('O campo E-mail é obrigatório');
      return;
    }
    if (!client.password) {
      this.addAlertWarn('O campo Senha é obrigatório');
      return;
    }
    if (!client._id && !client.confirma_password) {
      this.addAlertWarn('O campo Confirmar Senha é obrigatório');
      return;
    }
    if (!client.phone) {
      this.addAlertWarn('O campo Telefone com DDD é obrigatório');
      return;
    }
    if (!client.cep) {
      this.addAlertWarn('O campo CEP é obrigatório');
      return;
    }
    if (!client.complemento) {
      this.addAlertWarn('O campo Complemento é obrigatório');
      return;
    }
    if (!client.sexo) {
      this.addAlertWarn('O campo Sexo é obrigatório');
      return;
    }

    this.userService.saveClient(client).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/clientes']);
    }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
    });
  }

  private addAlertError(message: string) {
    this.addAlert('danger', message);
  }

  private addAlertWarn(message: string) {
    this.addAlert('warning', message);
  }

  private addAlert(type: string, message: string) {
    const alert = { type: type, message: message };
    if (this.alerts.indexOf(alert) === -1) {
      this.alerts.push(alert);
      window.scroll(0, 0);
      setTimeout(() => {
        this.close(alert);
      }, 8000);
    }
  }

  close(alert: Alert) {
    const indexRemove = this.alerts.indexOf(alert);
    if (indexRemove !== -1) {
      this.alerts.splice(indexRemove, 1);
    }
  }

}
