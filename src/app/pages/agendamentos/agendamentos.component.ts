import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css'],
  providers: [NgbRatingConfig] 
})
export class AgendamentosComponent implements OnInit {
  public eventsCorporate: any[] = [];
  public eventCorporate: any[] = [];
  public eventsHome: any[] = [];
  public eventsAvaliate: any[] = [];
  public codigo: string;
  public Clientes : boolean = false;

  constructor(private modalService: NgbModal,
    private eventService: EventService,
    config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
     }       
     
  ngOnInit() {
    this.eventsCorporate = [];
    this.eventsHome = [];
    this.eventsAvaliate = [];
    this.eventCorporate = [];

    this.listAllCorporate();


  }
  
  public listarClientes() {
    this.Clientes = true;
  }


  listEvent(id: any, content: any){
    this.modalService.open(content, { size: 'lg' });
    this.eventService.listItem(id).subscribe((data) => {
      this.eventCorporate = data;

        this.eventService.buscarAvaliacaoByProfissional(this.eventCorporate[0]._id)
          .subscribe((avaliacao) => {

          this.eventService.listarPayments(this.eventCorporate[0]._id).subscribe((payments) => {
            this.eventCorporate.map(eventIter => {
              eventIter.payments = payments;
              eventIter.avaliacao = avaliacao;
            });
          });
          console.log(this.eventCorporate);
      });
    });
  }

  pesquisar() {
    this.eventService.pesquisar(this.codigo).subscribe((data) => {
      this.eventsCorporate = data;
      this.eventService.listarPayments(this.codigo).subscribe((payments) => {
        this.eventsCorporate.map(eventIter => {
          eventIter.payments = payments;
        });

      });
    });
  }

  listAllCorporate() {
    this.eventService.listAllCorporate().subscribe((data) => {
      console.log(data);
      this.eventsCorporate = data;
    });
  }

}
