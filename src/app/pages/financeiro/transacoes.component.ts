import { Component, OnInit, Host } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { TransacoesService } from 'src/app/services/transacoes.service';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html'
})
export class TransacoesComponent implements OnInit {

  public transacoes: any[] = [];
  public startDate: any;
  public endDate: any;  
  
  constructor(private transacoesService: TransacoesService) {
  }

  ngOnInit() {
    this.consultarTransacoes();
  }

  private consultarTransacoes() {
    this.transacoesService.buscarTransacoes().subscribe((data: any)=>{
        this.transacoes = data.transfers;
        console.log("Transacoes recuperadas com sucesso: " + data);
    });
  }

  public filtrar() {
    let queryParameter = this.createQueryParameter();

    if (queryParameter != '') {
        this.transacoesService.buscarTransacoesFiltro(queryParameter).subscribe((data: any)=>{
            this.transacoes = data.transfers;
            console.log("Transacoes recuperadas com sucesso: " + data);
        });
    } else {
        this.transacoesService.buscarTransacoes().subscribe((data: any)=>{
            this.transacoes = data.transfers;
            console.log("Transacoes recuperadas com sucesso: " + data);
        });
    }
  }

  private createQueryParameter(): string {
    if (this.startDate && this.endDate) {
        return `?startDate=${this.startDate}&endDate=${this.endDate}`;
    }

    if (this.startDate) {
        return `?startDate=${this.startDate}`;
    }

    if (this.endDate) {
        return `?endDate=${this.endDate}`;
    }

    return '';
  }
}
