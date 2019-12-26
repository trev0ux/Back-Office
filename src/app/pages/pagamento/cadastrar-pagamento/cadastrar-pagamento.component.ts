import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { BaseComponent } from 'src/app/core/base/base-component';
import { AuthService } from '../../../services/auth.service';
interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-cadastrar-pagamento',
  templateUrl: './cadastrar-pagamento.component.html',
  styleUrls: ['./cadastrar-pagamento.component.css']
})
export class CadastrarPagamentoComponent extends BaseComponent implements OnInit {

  alerts: Alert[];
  public maskPhone: string;

  public userModel: User;

  public modoAlteracao: boolean;

  public cartao = { id: '', titular: '', numero: '', dataExpiracao: '', codigoSeguranca: '' };


  constructor(private userService: UserService,
    private router: Router,
    private authService: AuthService,
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
    this.router.navigate(['/pagamento']);
  }

  public save() {
    
      if (!this.cartaoValido()) {
          return;
      }

      let dataExpiracao: String[] = this.cartao.dataExpiracao.split("/");

      let dadosCartao = {
          "holderName": this.cartao.titular,
          "number": this.cartao.numero,
          "expirationMonth": dataExpiracao[0],
          "expirationYear": "20" + dataExpiracao[1],
          "securityCode": this.cartao.codigoSeguranca
      };

      this.userService.cadastrarCartaoPaggcerto(dadosCartao).subscribe((data: any) => {
        const user = this.authService.isAuthenticated();

        let dadosCard = {
          "cartaoId": data.id,
          "idUser": user._id
        }

        this.userService.cadastrarCartaoFast(dadosCard).subscribe((data: any) => {
        });
      }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
      });
      
      
      /*, error => {
          if (error.hasOwnProperty('error') && error.error != undefined) {
              let erroAtual = error.error;

              if (erroAtual.hasOwnProperty("errors") && erroAtual.errors != undefined) {
                  this.addAlertError(erroAtual.errors));
              }
          } else {
              this.addAlertError('Erro ao registrar cartao. Verifique seus dados.');
          }
      }*///);

  }

   public exibirUltimosNumerosCartao() {
        if (this.cartao.numero) {
            return "****" + this.cartao.numero.substr(12);
        }

        return this.cartao.numero;
    }

    private cartaoJaCadastrado(): boolean {
        return (!this.isEmpty(this.cartao.id));
    }

    public existeCartao(): boolean {
        return !(this.isEmpty(this.cartao.id)) || (this.cartao.numero.length > 10);
    }

    private cartaoValido(): boolean {
        if (this.isEmpty(this.cartao.titular) || this.isEmpty(this.cartao.numero) || this.isEmpty(this.cartao.codigoSeguranca) || this.isEmpty(this.cartao.dataExpiracao)) {
            this.addAlertWarn('Informar dados do cartao!');
            return false;
        }

        //FIXME escrever regex para validar numero cartao
        if (isNaN(Number(this.cartao.numero)) && !(this.cartao.numero.length >= 13 && this.cartao.numero.length <= 19)) {
            this.addAlertWarn('Numero do cartao invalido!');
            return false;
        }

        //FIXME escrever regex para validar numero cartao
        if (isNaN(Number(this.cartao.codigoSeguranca)) && !(this.cartao.codigoSeguranca.length == 3)) {
            this.addAlertWarn('Codigo seguranca invalido!');
            return false;
        }

        let dataExpiracao: String[] = this.cartao.dataExpiracao.split("/");

        if (dataExpiracao.length != 2) {
            this.addAlertWarn('Data expiracao invalida!');
            return false;
        }

        let mes = dataExpiracao[0];
        let ano = dataExpiracao[1];

        if (isNaN(Number(mes)) || isNaN(Number(ano))) {
            this.addAlertWarn('Data expiracao invalida!');
            return false;
        }

        return true;
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

 /* protected isEmpty(value: any): boolean {
    return !value || value == '';
  }

  protected isNullOrUndefinedOrEmpty(value: any): boolean {
    return !value || (value.toString() === '');
  }*/


}
