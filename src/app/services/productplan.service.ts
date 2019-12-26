import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';
import { BaseMongoService } from './base.mongo.service';
import { config } from '../../config';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';

@Injectable()
export class ProductPlanService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('productplan', _http);
  }

  batimento(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${config.HOST}/fechamento/contas/batimento`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv');
    headers = headers.append('Content-Type', 'text/csv');
    return this._http.get(url, httpOptions);
  }
}
