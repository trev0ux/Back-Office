import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { IModel } from '../models/model';
import { BaseMongoService } from './base.mongo.service';

@Injectable()
export class TransacoesService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('payment', _http);
  }

  public buscarTransacoes(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/transacoes`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  public buscarTransacoesFiltro(filtros: any): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/transacoes` + filtros;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }
}
