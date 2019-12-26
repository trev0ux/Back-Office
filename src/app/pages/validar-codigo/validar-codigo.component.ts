import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
  type: string;
  message: string;
}


@Component({
  selector: 'app-validar-codigo',
  templateUrl: './validar-codigo.component.html',
  styleUrls: ['./validar-codigo.component.css']
})
export class ValidarCodigoComponent implements OnInit {

    form1: boolean;
    form2: boolean;
    token: any;
    public eventsPartners: any[] = [ ];
    public eventsServices: any[] = [ ];
    public eventItem: any;

    errors: Array<string> = [];
    alerts: Alert[];


  constructor(private modalService: NgbModal,
    private eventService: EventService,) { }

 openLg(content) {
   this.modalService.open(content, { size: 'lg' });
    }

  ngOnInit() {
    this.eventsPartners = [];
    this.eventsServices = [];
    this.form1 = true;
    this.form2 = false;

    this.alerts = [];

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

  private close(alert: Alert) {
    const indexRemove = this.alerts.indexOf(alert);
    if (indexRemove !== -1) {
      this.alerts.splice(indexRemove, 1);
    }
  }

  sumTotal(): any {
    return this.eventItem.products.reduce((acc, val) => acc + (val.valor * (val.discount / 100)), 0).toFixed(2);
  }

pesquisar(){
    this.eventService.listEventPartner(this.token.toLowerCase()).subscribe((data) => {
      this.eventsPartners = data;

      this.eventItem  = data[0];
      //this.eventService = data[0].products;

      if(this.token.toLowerCase() === data[0].token.toLowerCase()){
        this.form1 = false;
        this.form2 = true;
       // console.log('User encontrado  '+ this.eventsPartners[0].token);
      }
    });
  }
  confirmarToken(){
    this.eventService.confirmarToken(this.eventItem._id).subscribe(() => {
      this.addAlertWarn('Desconto validado com sucesso!');
    });
    }
  voltar() {
    this.token = '';
    this.eventsPartners = [];
    this.eventsServices = [];
    this.form1 = true;
    this.form2 = false;
  }

}
